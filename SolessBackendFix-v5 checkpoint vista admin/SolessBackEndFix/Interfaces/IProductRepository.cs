using SolessBackend.Models;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Models;
using System.Collections.Generic;

namespace SolessBackEndFix.Interfaces
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetProductsAsync();
        Task<ICollection<Product>> GetProductsAsync(int offset, int limit);
        Task<Product> GetProductByIdAsync(long id);
        Task AddProductAsync(ProductDTO product);
        Task AddProductsAsync(IEnumerable<Product> products);
        Task<Product> GetProductByModel(string model);
        Task<int> GetTotalProductCountAsync();
        Task<ICollection<Product>> AscPriceProduct();
        Task<ICollection<Product>> DescPriceProduct();
        Task <ICollection<Product>> AtoZProductAsync();
        Task<ICollection<Product>> ZtoAProductAsync();
        Task UpdateStockAsync(long ProductId, int stockRestar);
        Task UpdateAllAsync(ProductDTO product);
        Task<string> StoreImageAsync(IFormFile file, string modelName);
    }
}
