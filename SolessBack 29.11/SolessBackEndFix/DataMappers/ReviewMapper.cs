using SolessBackEndFix.DTO;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.DataMappers
{
    public class ReviewMapper
    {
        // Método para convertir una entidad Review a ReviewDTO
        public ReviewDTO ReviewToDTO(Review review)
        {
            return new ReviewDTO
            {
                ProductId = review.ProductId,
                UserId = review.UserId,
                UserName = review.User?.Name,
                Content = review.Content,
                Rating = review.Rating,
                CreatedAt = review.CreatedAt
            };
        }

        // Método para convertir una lista de Review a una lista de ReviewDTO
        public IEnumerable<ReviewDTO> ReviewsToDTO(IEnumerable<Review> reviews)
        {
            return reviews.Select(ReviewToDTO).ToList();
        }

        // Método para convertir un ReviewDTO en una entidad Review
        public Review DTOToReview(ReviewDTO dto)
        {
            return new Review
            {
                ProductId = dto.ProductId,
                UserId = dto.UserId,
                Content = dto.Content,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow  // Establecemos la fecha de creación como la actual
            };
        }
    }
}
