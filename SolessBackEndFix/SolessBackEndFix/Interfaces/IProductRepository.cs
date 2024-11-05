using SolessBackend.Models;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Interfaces
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(long id);
        Task AddProductAsync(Product product);
        Task<Product> GetProductByModel(string model);
    }
}
