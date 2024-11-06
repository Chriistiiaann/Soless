using Examples.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using SolessBackEndFix.Models;  

namespace Examples.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmartSearchController : ControllerBase
    {
        private readonly SmartSearchService _smartSearchService;

        // Constructor con inyección de dependencias
        public SmartSearchController(SmartSearchService smartSearchService)
        {
            _smartSearchService = smartSearchService;
        }

        // Acción para realizar la búsqueda de productos
        [HttpGet]
        public IEnumerable<Product> Search([FromQuery] string query)
        {
            // Usamos el servicio inyectado para realizar la búsqueda y devolver los productos
            return _smartSearchService.Search(query);
        }
    }
}
