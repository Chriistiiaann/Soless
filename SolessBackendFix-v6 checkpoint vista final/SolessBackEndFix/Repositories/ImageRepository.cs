using Examples.WebApi.Helpers;
using Microsoft.EntityFrameworkCore;
using SolessBackEndFix.Models;

namespace Examples.WebApi.Services
{
    public class ImageRepository : IImageRepository
    {
        private const string IMAGES_FOLDER = "images";
        private readonly DbContext _context;

        public ImageRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Image>> GetAllAsync()
        {
            return await _context.Set<Image>().ToListAsync();
        }

        public async Task<Image> GetByIdAsync(long id)
        {
            return await _context.Set<Image>().FindAsync(id);
        }

        public async Task InsertAsync(Image image)
        {
            await _context.Set<Image>().AddAsync(image);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Image image)
        {
            _context.Set<Image>().Update(image);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Image image)
        {
            _context.Set<Image>().Remove(image);
            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task StoreImageAsync(string relativePath, IFormFile file)
        {
            using Stream stream = file.OpenReadStream();
            await FileHelper.SaveAsync(stream, relativePath);
        }
    }
}
