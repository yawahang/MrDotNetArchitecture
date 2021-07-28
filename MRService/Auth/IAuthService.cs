
using MRModel.Auth;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MRService.Auth
{
    public interface IAuthService
    {
        Task<MvJwtAuthResult> GenerateToken(string username, Claim[] claims);
        void RemoveExpiredRefreshTokens();
        void RemoveRefreshTokenByUsername(string userName);
        Task<MvJwtAuthResult> Refresh(string refreshToken, string accessToken);
    }
}
