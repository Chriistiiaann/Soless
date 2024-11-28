using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolessBackend.Interfaces;
using SolessBackend.Models;
using SolessBackend.DTO;
using SolessBackend.DataMappers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SolessBackEndFix.Models;
using SolessBackEndFix.Interfaces;

namespace SolessBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Inyecciones
        private readonly IUserRepository _userRepository;
        private readonly UserMapper _mapper;
        private readonly ICartRepository _cartRepository;
        private readonly CartMapper _cartMapper;

        public UserController(IUserRepository userRepository, UserMapper userMapper, ICartRepository cartRepository, CartMapper cartMapper)
        {
            _userRepository = userRepository;
            _mapper = userMapper;
            _cartRepository = cartRepository;
            _cartMapper = cartMapper;
        }

        // GetAllUsers
        [HttpGet]
        public async Task<IActionResult> GetUsersAsync()
        {
            // Comprobación de errores de ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Intentar obtener los usuarios desde el repositorio
                var users = await _userRepository.GetUsersAsync();

                // Comprobar si la lista de usuarios es nula o está vacía
                if (users == null || !users.Any())
                {
                    return NotFound("No users found.");
                }

                // Creación del user DTO por cada User en la base de datos
                IEnumerable<UserDTO> usersDTO = _mapper.usersToDTO(users);

                return Ok(usersDTO);
            }
            catch (Exception ex)
            {
                // Captura cualquier error inesperado y devuelve una respuesta de error 500
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAsync(long id)
        {
            // Verificar si el ID es válido
            if (id <= 0)
            {
                return BadRequest("Invalid user ID.");
            }

            try
            {
                // Intentar obtener el usuario desde el repositorio
                var user = await _userRepository.GetUserByIdAsync(id);

                // Comprobar si el usuario no existe
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                // Crear UserDTO según el User encontrado
                UserDTO userDTO = _mapper.userToDTO(user);

                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                // Capturar cualquier error inesperado y devolver una respuesta de error 500
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddUserAsync([FromBody] UserCreateDTO userToAddDTO)
        {
            if (userToAddDTO == null)
            {
                return BadRequest("Información necesaria no enviada.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userRepository.GetUserByEmailAsync(userToAddDTO.Email);
            if (existingUser != null)
            {
                return Conflict("Email existente, por favor introduzca otro Email.");
            }

            try
            {
                var userToAdd = new User
                {
                    Id = userToAddDTO.Id,
                    Name = userToAddDTO.Name,
                    Email = userToAddDTO.Email,
                    Password = userToAddDTO.Password,
                    Role = userToAddDTO.Role,
                    Address = userToAddDTO.Address
                };

                var passwordHasher = new PasswordHasher(); 
                userToAdd.Password = passwordHasher.Hash(userToAdd.Password);

                await _userRepository.AddUserAsync(userToAdd);

                return Ok(new { message = "Usuario registrado con éxito y carrito vacío asociado." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(long id)
        {
            // Buscar el usuario por su ID
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            try
            {
                // Eliminar el usuario si existe
                await _userRepository.DeleteUserAsync(id);
            }
            catch (Exception ex)
            {
                // Devolver error en caso de fallo
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            // Devolver confirmación de eliminación
            return NoContent(); // Respuesta 204 para indicar que la eliminación fue exitosa
        }
    }
}