using Microsoft.AspNetCore.Mvc;
using SolessBackEndFix.DataMappers;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;
using SolessBackEndFix.Repositories;

namespace SolessBackEndFix.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly ReviewMapper _reviewMapper;
        private readonly IOrderRepository _orderRepository; // Agregar la dependencia para acceder al repositorio de órdenes

        public ReviewController(IReviewRepository reviewRepository, ReviewMapper reviewMapper, IOrderRepository orderRepository)
        {
            _reviewRepository = reviewRepository;
            _reviewMapper = reviewMapper;
            _orderRepository = orderRepository;
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
            // Verificar si el usuario ha comprado el producto antes de permitir la reseña
            var hasPurchased = await _orderRepository.HasUserPurchasedProductAsync(reviewDto.UserId, reviewDto.ProductId);

            if (!hasPurchased)
            {
                return BadRequest("You must purchase the product before leaving a review.");
            }

            // Si el usuario ha comprado el producto, procedemos a agregar la reseña
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
