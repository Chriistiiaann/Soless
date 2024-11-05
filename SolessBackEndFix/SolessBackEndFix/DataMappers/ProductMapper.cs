using SolessBackend.DTO;
using SolessBackend.Models;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Models;

namespace SolessBackend.DataMappers
{
    public class ProductMapper
    {
        public ProductDTO productToDTO(Product product)
        {
            return new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Stock = product.Stock,
                Img = product.Img,
                Review = product.Review,
                Description = product.Description
            };
        }

        public IEnumerable<ProductDTO> productToDTO(IEnumerable<Product> products)
        {
            return products.Select(productToDTO);
        }

        public Product DTOToEntity(ProductDTO productsDTO)
        {
            return new Product
            {
                Id = productsDTO.Id,
                Name = productsDTO.Name,
                Price = productsDTO.Price,
                Stock = productsDTO.Stock,
                Img = productsDTO.Img,
                Review = productsDTO.Review,
                Description = productsDTO.Description
            };
        }

        public IEnumerable<Product> DTOsToEntities(IEnumerable<ProductDTO> productsDTO)
        {
            return productsDTO.Select(DTOToEntity);
        }
    }
}
