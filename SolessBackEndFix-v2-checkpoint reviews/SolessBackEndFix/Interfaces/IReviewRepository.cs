using SolessBackEndFix.Models;

namespace SolessBackEndFix.Interfaces
{
    public interface IReviewRepository
    {
        Task<ICollection<Review>> GetReviewsAsync();
        Task<Review> GetReviewByIdAsync(long id);
        Task<ICollection<Review>> GetReviewsByProductIdAsync(long productId);
        Task<ICollection<Review>> GetReviewsByUserIdAsync(long userId);
        Task AddReviewAsync(Review review);
        Task DeleteReviewAsync(long id);
    }
}
