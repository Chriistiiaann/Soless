using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using PruebaSolessChristian.Models.Database.Repositories;
using PruebaSolessChristian.Models.Database;
using PruebaSolessChristian.Models.Dtos;

namespace PruebaSolessChristian.Controllers;

[Authorize(Roles = "admin")]
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly TokenValidationParameters _tokenParameters;
    private readonly SolessMasterContext _context;
    private readonly IPasswordHash _passwordHash;

    public AuthController(IOptionsMonitor<JwtBearerOptions> jwOptions, SolessMasterContext context, IPasswordHash passwordHash)
    {
        _tokenParameters = jwOptions.Get(JwtBearerDefaults.AuthenticationScheme)
            .TokenValidationParameters;
        _context = context;
        _passwordHash = passwordHash;
    }


    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<ActionResult<string>> Login([FromBody] PruebaSolessChristian.Models.Dtos.LoginRequest model)
    {
        string passwordHasheada = _passwordHash.Hash(model.Password);

        // Buscar el usuario en la base de datos
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == passwordHasheada);

        // Validar si el usuario existe
        if (user != null)
        {
            // Creamos token en caso de que exista.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Claims = new Dictionary<string, object>
                {
                    { "Id", user.Id },
                    { "Name", user.Name },
                    { "Email", user.Email },
                    { "Address", user.Address },
                    { ClaimTypes.Role, user.Role}
                },
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    _tokenParameters.IssuerSigningKey,
                    SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string stringToken = tokenHandler.WriteToken(token);

            return Ok(new LoginResult { AccessToken = stringToken });
        }
        else
        {
            return Unauthorized("Email o contraseña incorrecto");
        }
    }

    [Authorize(Roles = "admin")]
    [HttpGet]
    public string GetSecret()
    {
        return "Esto es un secreto que no todo el mundo debería leer";
    }
}