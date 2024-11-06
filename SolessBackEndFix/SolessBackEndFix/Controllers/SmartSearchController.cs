using Examples.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;
using System.Linq;

namespace Examples.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmartSearchController : ControllerBase
    {
        private readonly SmartSearchService _smartSearchService;
        private readonly IProductRepository _productRepository;

        // Constructor con inyección de dependencias
        public SmartSearchController(SmartSearchService smartSearchService, IProductRepository productRepository)
        {
            _smartSearchService = smartSearchService;
            _productRepository = productRepository;
        }

        // Acción para realizar la búsqueda de productos
        [HttpPost("Search")]
        public IActionResult Search([FromQuery] string query = "",
                                    [FromQuery] string sortField = "none",
                                    [FromQuery] string sortOrder = "none",
                                    [FromQuery] int page = 1,
                                    [FromQuery] int limit = 10)
        {
            // Validar la paginación
            if (page < 1 || limit < 1)
            {
                return BadRequest("La página y el límite deben ser mayores que 0.");
            }

            try
            {
              
                var products = string.IsNullOrWhiteSpace(query) ? _productRepository.GetProductsAsync().Result : _smartSearchService.Search(query);           

                if (products == null || !products.Any())
                {
                    return NotFound("No products found.");
                }

                // Ordenar los productos si sortField es válido
                if (sortField.ToLower() == "price")
                {
                    if (sortOrder.ToLower() == "asc")
                    {
                        products = products.OrderBy(p => p.Original_Price).ToList();
                    }
                    else if (sortOrder.ToLower() == "desc")
                    {
                        products = products.OrderByDescending(p => p.Original_Price).ToList();
                    }
                }
                else if (sortField.ToLower() == "name")
                {
                    if (sortOrder.ToLower() == "asc")
                    {
                        products = products.OrderBy(p => p.Model).ToList();
                    }
                    else
                    {
                        products = products.OrderByDescending(p => p.Model).ToList();
                    }
                }

                var totalItems = products.Count();
                var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

                var paginatedProducts = products.Skip((page - 1) * limit).Take(limit).ToList();

                var result = new
                {
                    currentPage = page,
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