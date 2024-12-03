using SolessBackEndFix.Models;

namespace SolessBackend.DTO
{
    public class UserDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public string? Address { get; set; }
    }

    public class UserCreateDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? Address { get; set; }
    }
}
