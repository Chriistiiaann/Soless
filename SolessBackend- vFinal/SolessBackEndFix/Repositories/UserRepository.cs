using SolessBackend.Data;
using SolessBackend.Interfaces;
using SolessBackend.Models;
using Microsoft.EntityFrameworkCore;
using SolessBackEndFix.Models;
using SolessBackend.DTO;

namespace SolessBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataBaseContext _context;
        private readonly IPasswordHasher _passwordHasher;

        public UserRepository(DataBaseContext context, IPasswordHasher hasher)
        {
            _context = context;
            _passwordHasher = hasher;
        }

        public async Task<ICollection<User>> GetUsersAsync()
        {
            return await _context.Users.OrderBy(u => u.Id).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(long id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();  

            var cart = new Cart
            {
                UserId = user.Id  
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();  
        }

        public async Task DeleteUserAsync(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateUserAsync(UserCreateDTO user)
        {
            // Busca el usuario en la base de datos
            var usuarioVariado = _context.Users.FirstOrDefault(p => p.Id == user.Id);
            var passwordHashed = _passwordHasher.Hash(user.Password);

            if (usuarioVariado == null)
            {
                throw new Exception("La variación del usuario no existe.");
            }

            // Solo actualiza los campos si tienen un valor válido
            if (user.Name != "" && user.Name != "string")
            {
                usuarioVariado.Name = user.Name;
            }

            if (user.Email != "" && user.Email != "string")
            {
                usuarioVariado.Email = user.Email;
            }

            if (user.Password != "" && user.Password != "string")
            {
                usuarioVariado.Password = passwordHashed;
            }

            if (user.Address != "" && user.Address != "string")
            {
                usuarioVariado.Address = user.Address;
            }

            // Actualiza y guarda los cambios en la base de datos
            _context.Users.Update(usuarioVariado);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAdminAsync(UserCreateDTO user)
        {
            var usuarioVariado = _context.Users.FirstOrDefault(p => p.Id == user.Id);

            if (usuarioVariado == null)
            {
                throw new Exception("La variación del user no existe.");
            }

            if (user.Role == "none" || user.Role == "admin")
            {
                usuarioVariado.Role = user.Role;
            }
            else
            {
                throw new Exception("El rol debe de ser admin o none");
            }

            _context.Users.Update(usuarioVariado);
            await _context.SaveChangesAsync();
        }
    }
}