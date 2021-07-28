using Microsoft.IdentityModel.Tokens;
using MRModel.Auth;
using System;
using System.Collections.Concurrent;
using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MRService.Auth
{
    public class AuthService : IAuthService
    {
        public IImmutableDictionary<string, MvRefreshToken> UsersRefreshTokensReadOnlyDictionary => _usersRefreshTokens.ToImmutableDictionary();
        private readonly ConcurrentDictionary<string, MvRefreshToken> _usersRefreshTokens;
        private readonly MvJwtTokenConfig _jwtTokenConfig;
        private readonly byte[] _secret;

        public AuthService(MvJwtTokenConfig jwtTokenConfig)
        {
            _jwtTokenConfig = jwtTokenConfig;
            _usersRefreshTokens = new ConcurrentDictionary<string, MvRefreshToken>();
            _secret = Encoding.ASCII.GetBytes(jwtTokenConfig.Secret);
        }

        public void RemoveExpiredRefreshTokens()
        {
            var expiredTokens = _usersRefreshTokens.Where(x => x.Value.ExpireAt < DateTime.Now).ToList();
            foreach (var expiredToken in expiredTokens)
            {
                _usersRefreshTokens.TryRemove(expiredToken.Key, out _);
            }
        }

        public void RemoveRefreshTokenByUsername(string username)
        {
            var refreshTokens = _usersRefreshTokens.Where(x => x.Value.Username == username).ToList();
            foreach (var refreshToken in refreshTokens)
            {
                _usersRefreshTokens.TryRemove(refreshToken.Key, out _);
            }
        }

        public async Task<MvJwtAuthResult> GenerateToken(string username, Claim[] claims)
        {

            var shouldAddAudienceClaim = string.IsNullOrWhiteSpace(claims?.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Aud)?.Value);
            var creds = new SigningCredentials(new SymmetricSecurityKey(_secret), SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                issuer: _jwtTokenConfig.Issuer,
                audience: _jwtTokenConfig.Audience,
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddDays(_jwtTokenConfig.AccessTokenExpirationDay),
                signingCredentials: creds);

            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            var refreshToken = new MvRefreshToken
            {
                Username = username,
                TokenString = GenerateRefreshTokenString(),
                ExpireAt = DateTime.Now.AddMinutes(_jwtTokenConfig.RefreshTokenExpirationMin)
            };
            _usersRefreshTokens.AddOrUpdate(refreshToken.TokenString, refreshToken, (s, t) => refreshToken);

            return await Task.FromResult(new MvJwtAuthResult
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            });
        }

        public Task<MvJwtAuthResult> Refresh(string refreshToken, string accessToken)
        {
            var (principal, jwtToken) = DecodeJwtToken(accessToken);
            if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature))
            {
                throw new SecurityTokenException("InvalidToken");
            }

            var username = principal.Identity.Name;
            if (!_usersRefreshTokens.TryGetValue(refreshToken, out var existingRefreshToken))
            {
                throw new SecurityTokenException("InvalidToken");
            }
            if (existingRefreshToken.Username != username || existingRefreshToken.ExpireAt < DateTime.Now)
            {
                throw new SecurityTokenException("InvalidToken");
            }

            return GenerateToken(username, principal.Claims.ToArray());
        }

        public (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                throw new SecurityTokenException("InvalidToken");
            }
            var principal = new JwtSecurityTokenHandler()
                .ValidateToken(token,
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = _jwtTokenConfig.Issuer,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(_secret),
                        ValidAudience = _jwtTokenConfig.Audience,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromMinutes(1)
                    },
                    out var validatedToken);
            return (principal, validatedToken as JwtSecurityToken);
        }

        private static string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
