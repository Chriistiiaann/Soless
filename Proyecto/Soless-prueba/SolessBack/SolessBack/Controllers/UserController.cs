using Microsoft.AspNetCore.Mvc;
using PruebaSolessChristian.Models.Database;
using PruebaSolessChristian.Models.Database.Repositories;
using SolessBack.Models.Dtos;

namespace PruebaSolessChristian.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserRepository _userRepository;

    public UserController(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("ObtenerUsers")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _userRepository.GetAllAsync();
        return Ok(new UserListDto(users));
    }

    [HttpGet("ObtenerUserById")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        var userInfo = new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role ?? "none",
            Address = user.Address
        };

        return Ok(userInfo);
    }

    [HttpPost("CrearUsuario")]
    public async Task<ActionResult<User>> CreateUser([FromBody] CrearUserDto model)
    {

        var user = new User
        {
            Name = model.Name,
            Address = model.Address,
            Email = model.Email,
            Password = model.Password,
            Role = model.Role ?? "none"
        };

        var createdUser = await _userRepository.InsertUserAsync(user);

        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
    }

    [HttpDelete("BorrarUsuario")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        await _userRepository.DeleteAsync(user);

        return NoContent();
    }
}