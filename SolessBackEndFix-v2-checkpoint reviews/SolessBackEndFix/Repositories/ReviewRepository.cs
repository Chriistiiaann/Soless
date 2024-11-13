using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly DataBaseContext _context;

        public ReviewRepository(DataBaseContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Review>> GetReviewsAsync()
        {
            return await _context.Reviews.OrderBy(r => r.Id).ToListAsync();
        }

        public async Task<Review> GetReviewByIdAsync(long id)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Product)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<ICollection<Review>> GetReviewsByProductIdAsync(long productId)
        {
            return await _context.Reviews
                .Where(r => r.ProductId == productId)
                .Include(r => r.User)
                .ToListAsync();
        }

        public async Task<ICollection<Review>> GetReviewsByUserIdAsync(long userId)
        {
            return await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Product)
                .ToListAsync();
        }

        public async Task AddReviewAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReviewAsync(long id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();
            }
        }
    }
}
