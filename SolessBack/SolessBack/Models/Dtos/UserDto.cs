using PruebaSolessChristian.Models.Database;

namespace SolessBack.Models.Dtos;

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Role { get; set; } = "none";
    public string Address { get; set; }

}

public class CrearUserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } = "none";
    public string Address { get; set; }

}

public class UserListDto
{
    public IEnumerable<UserDto> Users { get; set; }

    public UserListDto(IEnumerable<User> users)
    {
        Users = users.Select(user => new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role ?? "none",
            Address = user.Address
        }).ToList();
    }
}