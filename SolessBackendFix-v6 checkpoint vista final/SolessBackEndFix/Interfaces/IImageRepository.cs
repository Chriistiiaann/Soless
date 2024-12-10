using SolessBackEndFix.Models;

namespace Examples.WebApi.Services
{
    public interface IImageRepository
    {
        Task<ICollection<Image>> GetAllAsync();
        Task<Image> GetByIdAsync(long id);
        Task InsertAsync(Image image);
        Task UpdateAsync(Image image);
        Task DeleteAsync(Image image);
        Task SaveAsync();
        Task StoreImageAsync(string relativePath, IFormFile file);
    }
}
