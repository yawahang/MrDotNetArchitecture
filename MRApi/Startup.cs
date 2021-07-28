using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MRApi.Helpers;
using MRModel.Auth;
using MRService.Account;
using MRService.Auth;
using MRService.Base;
using MRService.Business;
using MRService.DataAccess;
using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MRApi
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                 .SetBasePath(env.ContentRootPath)
                 .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                 .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var allowOrigin = Configuration.GetSection("AllowOrigin").Get<List<string>>(); // configure Chors for endpoint
            services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowOrigin",
                    builder =>
                    {
                        builder.WithOrigins(allowOrigin.ToArray())
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                       .AllowCredentials();
                    });
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            var jwtConfig = Configuration.GetSection("Jwt").Get<MvJwtTokenConfig>();

            services.AddSingleton(jwtConfig);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = jwtConfig.Issuer,
                    ValidateIssuer = true,
                    ValidAudience = jwtConfig.Audience,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Secret)),
                    ClockSkew = TimeSpan.FromMinutes(1)
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        context.Response.OnStarting(async () =>
                        {
                            context.NoResult();
                            context.Response.Headers.Add("Token-Expired", "true");
                            context.Response.ContentType = "text/plain";
                            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            await context.Response.WriteAsync(context.Exception.Message);
                        });

                        return Task.CompletedTask;
                    },
                    OnTokenValidated = async context =>
                    {
                        var db = await Task.FromResult(context.HttpContext.RequestServices.GetRequiredService<IDataAccessService>());
                        db.CurrentUserId = Convert.ToInt32(context.Principal.FindFirstValue("UserId"));
                        db.OrgCode = context.Principal.FindFirstValue("OrgCode");
                    }
                };
            });
            services.AddSingleton<IAuthService, AuthService>()
                .AddHostedService<JwtRefreshTokenCache>()
                .AddScoped<IDataAccessService, DataAccessService>();

            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
                options.Providers.Add<BrotliCompressionProvider>();
                options.MimeTypes = new[]
                {
                    // Default
                    "text/plain",
                    "text/css",
                    "application/javascript",
                    "text/html",
                    "application/xml",
                    "text/xml",
                    "application/json",
                    "text/json",
                    // Custom
                    "image/svg",
                    "image/jpeg",
                    "image/png",
                    "text/html",
                    "video/mp4",
                    "application/xhtml+xml",
                    "application/atom+xml",
                    "image/svg+xml",
                };
            });
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            }).Configure<BrotliCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });

            services.AddMemoryCache();

            services.AddTransient<IBaseService, BaseService>()
                .AddTransient<IAccountService, AccountService>()
                .AddTransient<IBusinessService, BusinessService>()
                .AddSingleton(Configuration)
                .AddHttpContextAccessor();

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.Cookie.Name = Configuration.GetSection("Cookie:Name").Get<string>();
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.IdleTimeout = TimeSpan.FromMinutes(Configuration.GetSection("Cookie:IdleMinutes").Get<int>());
                options.Cookie.HttpOnly = true;
            });

            //services.Configure<IISServerOptions>(options =>
            //{
            //    options.AutomaticAuthentication = false;
            //    options.AllowSynchronousIO = true;
            //});
            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = false;
                options.ForwardClientCertificate = false;
            });

            //services.AddHsts(options =>
            //{
            //    options.Preload = true;
            //    options.IncludeSubDomains = true;
            //    options.MaxAge = TimeSpan.FromDays(60);
            //    options.ExcludedHosts.Add("example.com");
            //    options.ExcludedHosts.Add("www.example.com");
            //});

            //services.AddHttpsRedirection(options =>
            //{
            //    options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
            //    options.HttpsPort = 5001;
            //});
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MRApi", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Must be before UseStaticFiles to compress static files and UseMvc to compress MVC responses
            app.UseResponseCompression();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseFileServer(); // set wwwroot/index.html as startup file

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseExceptionHandler( // custom exception handle stack trace
                options =>
                {
                    options.Run(
                        async context =>
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                            context.Response.ContentType = "text/html";
                            var exceptionObject = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
                            if (null != exceptionObject)
                            {
                                var errorMessage = $"<b>Error: {exceptionObject.Error.Message}</b>{exceptionObject.Error.StackTrace}";
                                await context.Response.WriteAsync(errorMessage).ConfigureAwait(false);
                            }
                        });
                });
                //app.UseSwagger();
                //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MRApi v1"));
            }

            //app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowOrigin");

            app.UseAuthentication();

            app.UseSession();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireCors("AllowOrigin");
            });
        }
    }
}
