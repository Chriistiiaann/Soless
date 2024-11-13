using Microsoft.AspNetCore.Mvc;
using SolessBackEndFix.DataMappers;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly ReviewMapper _reviewMapper;

        public ReviewController(IReviewRepository reviewRepository, ReviewMapper reviewMapper)
        {
            _reviewRepository = reviewRepository;
            _reviewMapper = reviewMapper;
        }

        // GET: api/Review
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetAllReviews()
        {
            var reviews = await _reviewRepository.GetReviewsAsync();
            var reviewsDto = _reviewMapper.ReviewsToDTO(reviews);
            return Ok(reviewsDto);
        }

        // GET: api/Review/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ReviewDTO>> GetReviewById(long id)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            var reviewDto = _reviewMapper.ReviewToDTO(review);
            return Ok(reviewDto);
        }

        // GET: api/Review/Product/{productId}
        [HttpGet("Product/{productId}")]
        public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetReviewsByProductId(long productId)
        {
            var reviews = await _reviewRepository.GetReviewsByProductIdAsync(productId);
            var reviewsDto = _reviewMapper.ReviewsToDTO(reviews);
            return Ok(reviewsDto);
        }

        // GET: api/Review/User/{userId}
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetReviewsByUserId(long userId)
        {
            var reviews = await _reviewRepository.GetReviewsByUserIdAsync(userId);
            var reviewsDto = _reviewMapper.ReviewsToDTO(reviews);
            return Ok(reviewsDto);
        }

        // POST: api/Review
        [HttpPost]
        public async Task<ActionResult> AddReview([FromBody] ReviewDTO reviewDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var review = _reviewMapper.DTOToReview(reviewDto);
            await _reviewRepository.AddReviewAsync(review);

            return CreatedAtAction(nameof(GetReviewById), new { id = review.Id }, reviewDto);
        }

        // DELETE: api/Review/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(long id)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            await _reviewRepository.DeleteReviewAsync(id);
            return NoContent();
        }
    }
}
