using Examples.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using System;
using System.Linq;

namespace Examples.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmartSearchController : ControllerBase
    {
        private readonly SmartSearchService _smartSearchService;
        private readonly IProductRepository _productRepository;

        public SmartSearchController(SmartSearchService smartSearchService, IProductRepository productRepository)
        {
            _smartSearchService = smartSearchService;
            _productRepository = productRepository;
        }

        [HttpPost("Search")]
        public IActionResult Search([FromBody] Search request)
        {
            if (request.Page < 1 || request.Limit < 1)
            {
                return BadRequest("La página y el límite deben ser mayores que 0.");
            }

            try
            {
                var products = string.IsNullOrWhiteSpace(request.Query)
                    ? _productRepository.GetProductsAsync().Result
                    : _smartSearchService.Search(request.Query);

                if (products == null || !products.Any())
                {
                    return NotFound("No products found.");
                }

                if (request.SortField.ToLower() == "price")
                {
                    products = request.SortOrder.ToLower() == "asc"
                        ? products.OrderBy(p => p.Original_Price).ToList()
                        : products.OrderByDescending(p => p.Original_Price).ToList();
                }
                else if (request.SortField.ToLower() == "name")
                {
                    products = request.SortOrder.ToLower() == "asc"
                        ? products.OrderBy(p => p.Model).ToList()
                        : products.OrderByDescending(p => p.Model).ToList();
                }

                var totalItems = products.Count();
                var totalPages = (int)Math.Ceiling(totalItems / (double)request.Limit);

                var paginatedProducts = products.Skip((request.Page - 1) * request.Limit).Take(request.Limit).ToList();

                var result = new
                {
                    currentPage = request.Page,
                    totalPages = totalPages,
                    totalItems = totalItems,
                    items = paginatedProducts
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
