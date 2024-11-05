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
                Brand = product.Brand,
                Model = product.Model,
                Original_Price = product.Original_Price,
                Discount_Price = product.Discount_Price,
                Stock = product.Stock,
                Img_Name = product.Img_Name,
                Description = product.Description,
                Composition = product.Composition
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
                Brand = productsDTO.Brand,
                Model = productsDTO.Model,
                Original_Price = productsDTO.Original_Price,
                Discount_Price = productsDTO.Discount_Price,
                Stock = productsDTO.Stock,
                Img_Name = productsDTO.Img_Name,
                Description = productsDTO.Description,
                Composition = productsDTO.Composition
            };
        }

        public IEnumerable<Product> DTOsToEntities(IEnumerable<ProductDTO> productsDTO)
        {
            return productsDTO.Select(DTOToEntity);
        }
    }
}
