using System;
using System.Data;
using System.Threading.Tasks;

namespace MRService.DataAccess
{
    public interface IDataAccessService : IDisposable
    {
        int CurrentUserId { get; set; }
        string OrgCode { get; set; }
        Task<IDbConnection> GetConnection(string orgCode = "mr");
        Task<string> RetrievalProc(string sp, string json, string orgCode = "mr");
        Task<string> ActionProc(string sp, string json);
    }
}
