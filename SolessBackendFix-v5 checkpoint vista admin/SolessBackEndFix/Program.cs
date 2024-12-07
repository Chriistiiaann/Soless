using Examples.WebApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SolessBackend.Data;
using SolessBackend.DataMappers;
using SolessBackend.Interfaces;
using SolessBackend.Models;
using SolessBackend.Repositories;
using SolessBackEndFix.Data.Seeder;
using SolessBackEndFix.DataMappers;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Repositories;
using Swashbuckle.AspNetCore.Filters;
using System.Security.Claims;
using System.Text;

namespace SolessBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {

            Directory.SetCurrentDirectory(AppContext.BaseDirectory);

            var builder = WebApplication.CreateBuilder(args);

            // Agregar CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin()    // Permite cualquier origen (incluyendo todos los puertos de localhost)
                           .AllowAnyHeader()    // Permite cualquier encabezado
                           .AllowAnyMethod();   // Permite cualquier m�todo (GET, POST, etc.)
                });
            });

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddScoped<DataBaseContext>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<UserMapper>();
            builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
            builder.Services.AddScoped<DataBaseContext>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<ProductMapper>();
            builder.Services.AddScoped<IReviewRepository, ReviewRepository>();  
            builder.Services.AddScoped<ReviewMapper>();  
            builder.Services.AddScoped<IOrderRepository, OrderRepository>();
            builder.Services.AddScoped <OrderMapper>();
            builder.Services.AddScoped<SmartSearchService>();
            builder.Services.AddScoped<CartMapper>();
            builder.Services.AddScoped<ICartRepository, CartRepository>();

            // Swagger configuration
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
                {
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    Description = "Escribe **_SOLO_** tu token JWT",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme
                });
                options.OperationFilter<SecurityRequirementsOperationFilter>(true, JwtBearerDefaults.AuthenticationScheme);
            });

            // JWT Authentication configuration
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                string key = Environment.GetEnvironmentVariable("JWT_KEY");
                if (string.IsNullOrEmpty(key))
                {
                    throw new Exception("JWT_KEY variable de entorno no est� configurada.");
                }

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    RoleClaimType = ClaimTypes.Role
                };
            });

            var app = builder.Build();

            static void SeedDatabase(IServiceProvider serviceProvider)
            {
                using IServiceScope scope = serviceProvider.CreateScope();
                using DataBaseContext dbContext = scope.ServiceProvider.GetService<DataBaseContext>();
                IPasswordHasher passwordHasher = scope.ServiceProvider.GetService<IPasswordHasher>();

                // Si no existe la base de datos entonces la creamos y ejecutamos el seeder
                if (dbContext.Database.EnsureCreated())
                {
                    Seeder seeder = new Seeder(dbContext, passwordHasher);
                    seeder.Seed();
                }
            }

            //Database initialization
            //using (IServiceScope scope = app.Services.CreateScope())
            //{
            //    DataBaseContext dbcontext = scope.ServiceProvider.GetService<DataBaseContext>();
            //    dbcontext.Database.EnsureCreated();
            //}

            // Habilitar Swagger y CORS para desarrollo o producci�n
            if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

           
            app.UseCors("AllowAllOrigins"); // Aplica la pol�tica de CORS
            
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"))
            });
            app.MapControllers();

            SeedDatabase(app.Services);
            app.Run();
        }
    }
}