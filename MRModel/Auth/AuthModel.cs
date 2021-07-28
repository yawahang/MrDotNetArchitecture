using System;

namespace MRModel.Auth
{
    public class MvJwtAuthResult
    {
        public string AccessToken { get; set; }
        public MvRefreshToken RefreshToken { get; set; }
    }

    public class MvRefreshToken
    {
        public string Username { get; set; } // can be used for usage tracking
        // can optionally include other metadata, such as user agent, ip address, device name, and so on 
        public string TokenString { get; set; }
        public DateTime ExpireAt { get; set; }
    }

    public class MvJwtTokenConfig
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int AccessTokenExpirationDay { get; set; }
        public int RefreshTokenExpirationMin { get; set; }
    }

    public class MvRefreshTokenRequest
    {
        public string RefreshToken { get; set; }
    }
}
