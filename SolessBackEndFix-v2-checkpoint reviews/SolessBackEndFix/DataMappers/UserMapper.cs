using SolessBackend.DTO;
using SolessBackend.Models;

namespace SolessBackend.DataMappers
{
    public class UserMapper
    {
        public UserDTO userToDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Address = user.Address,
                Reviews = user.Reviews
            };
        }

        public IEnumerable<UserDTO> usersToDTO(IEnumerable<User> users)
        {
            return users.Select(userToDTO);
        }

        public User DTOToEntity(UserDTO usersDTO)
        {
            return new User
            {
                Id = usersDTO.Id,
                Name = usersDTO.Name,
                Email = usersDTO.Email,
                Role = usersDTO.Role,
                Address = usersDTO.Address,
                Reviews = usersDTO.Reviews
            };
        }

        public IEnumerable<User> DTOsToEntities(IEnumerable<UserDTO> usersDTO)
        {
            return usersDTO.Select(DTOToEntity);
        }
    }
}
