using Examples.WebApi.Models.Dtos;
using SolessBackEndFix.Models;

namespace Examples.WebApi.Services
{
    public class ImageService
    {
        private readonly IImageRepository _imageRepository;

        public ImageService(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        public Task<ICollection<Image>> GetAllAsync()
        {
            return _imageRepository.GetAllAsync();
        }

        public Task<Image> GetAsync(long id)
        {
            return _imageRepository.GetByIdAsync(id);
        }

        public async Task<Image> InsertAsync(CreateUpdateImageRequest image)
        {
            string relativePath = $"images/{Guid.NewGuid()}_{image.File.FileName}";

            Image newImage = new Image
            {
                Name = image.Name,
                Path = relativePath
            };

            await _imageRepository.InsertAsync(newImage);
            await _imageRepository.StoreImageAsync(relativePath, image.File);

            return newImage;
        }

        public async Task<Image> UpdateAsync(long id, CreateUpdateImageRequest image)
        {
            Image entity = await _imageRepository.GetByIdAsync(id);
            entity.Name = image.Name;

            await _imageRepository.UpdateAsync(entity);

            if (image.File != null)
            {
                await _imageRepository.StoreImageAsync(entity.Path, image.File);
            }

            return entity;
        }

        public async Task DeleteAsync(long id)
        {
            Image image = await _imageRepository.GetByIdAsync(id);
            await _imageRepository.DeleteAsync(image);
        }
    }
}