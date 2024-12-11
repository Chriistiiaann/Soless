using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackend.Models;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;


namespace SolessBackEndFix.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataBaseContext _context;

        public ProductRepository(DataBaseContext context)
        {
            _context = context;
        }

        //Devuelve todos los productos sin paginación
        public async Task<ICollection<Product>> GetProductsAsync()
        {
            return await _context.Products.OrderBy(u => u.Id).ToListAsync();
        }

        //Devuelve productos según el offset y el límite
        public async Task<ICollection<Product>> GetProductsAsync(int offset, int limit)
        {
            // Aplica la paginación a la consulta
            return await _context.Products
                .OrderBy(u => u.Id)
                .Skip(offset)         // Salta el número de elementos determinado por el offset
                .Take(limit)          // Toma el número de elementos determinado por el límite
                .ToListAsync();
        }

        public async Task<string> StoreImageAsync(IFormFile file, string modelName)
        {
            string fileExtension = Path.GetExtension(file.FileName);
            string fileName = modelName + fileExtension;

            string imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            string filePath = Path.Combine(imagesFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        public async Task AddProductAsync(ProductDTO productDto)
        {
            var existingProduct = await _context.Products
                .FirstOrDefaultAsync(p => p.Model == productDto.Model);

            if (existingProduct != null)
            {
                throw new Exception("A product with this model already exists.");
            }

            var product = new Product
            {
                Brand = productDto.Brand,
                Model = productDto.Model,
                Original_Price = productDto.Original_Price,
                Discount_Price = productDto.Discount_Price,
                Stock = productDto.Stock,
                Description = productDto.Description,
                Composition = productDto.Composition
            };

            if (productDto.File != null)
            {
                try
                {
                    product.Img_Name = await StoreImageAsync(productDto.File, productDto.Model);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al guardar la imagen: " + ex.Message);
                }
            }

            await _context.Products.AddAsync(product);

            await _context.SaveChangesAsync();
        }

        public async Task AddProductsAsync(IEnumerable<Product> products)
        {
            _context.Products.AddRange(products);
            await _context.SaveChangesAsync();
        }
        public async Task<Product> GetProductByIdAsync(long id)
        {
            return await _context.Products.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Product> GetProductByModel(string model)
        {
            return await _context.Products.FirstOrDefaultAsync(u => u.Model == model);
        }

        public async Task<int> GetTotalProductCountAsync()
        {
            return await _context.Products.CountAsync();
        }

        public async Task<ICollection<Product>> AscPriceProduct()
        {
            var productos = await _context.Products.ToListAsync();
            return productos.OrderBy(p => p.Original_Price).ToList();
        }

        public async Task<ICollection<Product>> DescPriceProduct()
        {
            var productos = await _context.Products.ToListAsync();
            return productos.OrderByDescending(p => p.Original_Price).ToList();
        }

        public Task<ICollection<Product>> AtoZProductAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Product>> ZtoAProductAsync()
        {
            throw new NotImplementedException();
        }

        public async Task UpdateStockAsync(long ProductId, int stockRestar)
        {
            var productVariado = _context.Products.FirstOrDefault(p => p.Id == ProductId);


            if (productVariado == null)
            {
                throw new Exception("La variación del producto no existe.");
            }

            if (productVariado.Stock < stockRestar) 
            {
                throw new Exception("No hay suficiente stock disponible.");
            }

            productVariado.Stock -= stockRestar;

            _context.SaveChanges();
        }
        public async Task UpdateAllAsync(ProductDTO product)
        {
            // Obtener el producto de la base de datos
            var productVariado = await _context.Products.FirstOrDefaultAsync(p => p.Id == product.Id);

            if (productVariado == null)
            {
                throw new KeyNotFoundException("La variación del producto no existe.");
            }

            // Validaciones iniciales
            if (product.Stock < 0)
            {
                throw new ArgumentException("No se puede poner menos de 0 de stock.");
            }

            if (product.Original_Price < 0 || product.Discount_Price < 0)
            {
                throw new ArgumentException("El precio no puede ser negativo.");
            }

            // Actualización de campos si los valores son válidos
            if (!string.IsNullOrWhiteSpace(product.Brand) && product.Brand != "string")
            {
                productVariado.Brand = product.Brand.Trim();
            }

            if (!string.IsNullOrWhiteSpace(product.Model) && product.Model != "string")
            {
                productVariado.Model = product.Model.Trim();
            }

            if (product.Original_Price > 0)
            {
                productVariado.Original_Price = product.Original_Price;
            }

            if (product.Discount_Price >= 0)
            {
                productVariado.Discount_Price = product.Discount_Price;
            }

            if (product.Stock > 0)
            {
                productVariado.Stock = product.Stock;
            }

            if (!string.IsNullOrWhiteSpace(product.Description) && product.Description != "string")
            {
                productVariado.Description = product.Description.Trim();
            }

            if (!string.IsNullOrWhiteSpace(product.Composition) && product.Composition != "string")
            {
                productVariado.Composition = product.Composition.Trim();
            }

            // Procesar y almacenar imagen 
            if (product.File != null)
            {
                try
                {
                    var modelImage = !string.IsNullOrWhiteSpace(product.Model) && product.Model != "string"
                        ? product.Model
                        : productVariado.Model;

                    productVariado.Img_Name = await StoreImageAsync(product.File, modelImage);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Error al guardar la imagen.", ex);
                }
            }
            else if (!string.IsNullOrWhiteSpace(product.Img_Name) && product.Img_Name != "string")
            {
                productVariado.Img_Name = product.Img_Name.Trim();
            }

            // Guardar cambios en la base de datos
            _context.Products.Update(productVariado);
            await _context.SaveChangesAsync();
        }

    }
}
