using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using System;
using System.IO;

namespace MRApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            // Log.Logger = new LoggerConfiguration()
            //.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            //.Enrich.FromLogContext()
            //.WriteTo.Console()
            //.CreateLogger();

            // try
            // {
            //     Log.Information("Starting api...");
            //     CreateHostBuilder(args).Build().Run();
            // }
            // catch (Exception ex)
            // {
            //     Log.Fatal(ex, "Api terminated unexpectedly...");
            // }
            // finally
            // {
            //     Log.CloseAndFlush();
            // }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
              //.UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseContentRoot(Directory.GetCurrentDirectory())
                              .UseIISIntegration()
                              .UseStartup<Startup>();
                });
    }
}
