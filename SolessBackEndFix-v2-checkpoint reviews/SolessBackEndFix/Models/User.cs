using SolessBackEndFix.Models;
using System.ComponentModel.DataAnnotations;

namespace SolessBackend.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? Address { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
