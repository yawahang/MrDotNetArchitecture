using Dapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace MRService.DataAccess
{
    public class DataAccessService : IDataAccessService
    {
        private readonly IConfiguration _conf;
        public int CurrentUserId { get; set; }
        public string OrgCode { get; set; }

        public DataAccessService(IConfiguration conf)
        {
            _conf = conf;
        }

        public async Task<IDbConnection> GetConnection(string orgCode = "mr")
        {
            string orgCnStr = _conf[$"ConnectionString:{OrgCode ?? orgCode}:Source"];
            var conn = new SqlConnection(orgCnStr);
            conn.Open();
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", JsonConvert.SerializeObject(new { UserId = CurrentUserId }), DbType.String);
                await conn.ExecuteScalarAsync("utl.SetContextInfo", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return conn;
        }

        public async Task<string> RetrievalProc(string sp, string json, string orgCode = "mr")
        {
            using var conn = await GetConnection(orgCode);
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", json, DbType.String, size: int.MaxValue);
                var result = await conn.QueryFirstOrDefaultAsync<string>(sp, param, commandType: CommandType.StoredProcedure);
                conn.Close();
                return result ?? "{}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> ActionProc(string sp, string json)
        {
            using var conn = await GetConnection();
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", json, DbType.String, direction: ParameterDirection.InputOutput, size: int.MaxValue);
                var result = await conn.ExecuteAsync(sp, param, commandType: CommandType.StoredProcedure);
                conn.Close();
                return param.Get<string>("Json") ?? "{}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Dispose()
        {

        }
    }
}
