using SolessBackEndFix.DTO;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Interfaces
{
    public interface IReviewRepository
    {
        Task<ICollection<Review>> GetReviewsAsync();
        Task<Review> GetReviewByIdAsync(long id);
        //Task<ICollection<Review>> GetReviewsByProductIdAsync(long productId);
        Task<IEnumerable<ReviewDTO>> GetReviewsByProductIdAsync(long productId); // Cambiado a ReviewDTO
        Task<ICollection<Review>> GetReviewsByUserIdAsync(long userId); //Cambiado a ReviewDTO
        Task AddReviewAsync(Review review);
        Task DeleteReviewAsync(long id);
    }
}
