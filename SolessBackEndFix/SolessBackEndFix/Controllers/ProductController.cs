using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SolessBackend.DataMappers;
using SolessBackend.DTO;
using SolessBackend.Interfaces;
using SolessBackend.Models;
using SolessBackend.Repositories;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // Inyecciones
        private readonly IProductRepository _productRepository;
        private readonly ProductMapper _mapper;

        public ProductController(IProductRepository productRepository, ProductMapper productMapper)
        {
            _productRepository = productRepository;
            _mapper = productMapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            // Comprobación de errores de ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Intentar obtener los usuarios desde el repositorio
                var product = await _productRepository.GetProductsAsync();

                // Comprobar si la lista de usuarios es nula o está vacía
                if (product == null || !product.Any())
                {
                    return NotFound("No products found.");
                }

                // Creación del user DTO por cada User en la base de datos
                IEnumerable<ProductDTO> productsDTO = _mapper.productToDTO(product);

                return Ok(productsDTO);
            }
            catch (Exception ex)
            {
                // Captura cualquier error inesperado y devuelve una respuesta de error 500
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProductAsync([FromBody] Product productToAdd)
        {
            if (productToAdd == null)
            {
                return BadRequest("Product data is required.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Verificar si el usuario ya existe
            var existingProduct = await _productRepository.GetProductByModel(productToAdd.Model);
            if (existingProduct != null)
            {
                return Conflict("A Product with this name already exists.");
            }

            try
            {
                await _productRepository.AddProductAsync(productToAdd);
            }
            catch (Exception ex)
            {
                // Capturar y devolver un error interno si algo falla
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            // Retornar el usuario recién creado
            return Ok(new { message = "Producto registrado con éxito" });

        }

    }
}
