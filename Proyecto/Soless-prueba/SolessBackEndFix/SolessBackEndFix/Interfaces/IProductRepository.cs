using SolessBackend.Models;
using SolessBackEndFix.Models;
using System.Collections.Generic;

namespace SolessBackEndFix.Interfaces
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetProductsAsync();
        Task<ICollection<Product>> GetProductsAsync(int offset, int limit);
        Task<Product> GetProductByIdAsync(long id);
        Task AddProductAsync(Product product);
        Task<Product> GetProductByModel(string model);
        Task<int> GetTotalProductCountAsync();
    }
}
