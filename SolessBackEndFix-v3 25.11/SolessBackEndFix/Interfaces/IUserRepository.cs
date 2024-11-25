using SolessBackend.Models;

namespace SolessBackend.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(long id);
        Task AddUserAsync(User user);
        Task<User> GetUserByEmailAsync(string email);
        Task DeleteUserAsync(long id);
    }
}