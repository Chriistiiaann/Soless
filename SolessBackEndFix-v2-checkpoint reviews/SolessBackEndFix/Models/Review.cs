using SolessBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace SolessBackEndFix.Models
{
    public class Review
    {
        [Key]
        public long Id { get; set; }

        public long ProductId { get; set; }  // Relación con el producto
        public Product Product { get; set; }  // Navegación a la clase Product

        public long UserId { get; set; }  // Relación con el usuario
        public User User { get; set; }  // Navegación a la clase User

        public string? Content { get; set; }  // Texto de la reseña
        public int Rating { get; set; }  // Calificación (por ejemplo, 1 a 5)
        public DateTime CreatedAt { get; set; }  // Fecha de creación de la reseña
    }

}
