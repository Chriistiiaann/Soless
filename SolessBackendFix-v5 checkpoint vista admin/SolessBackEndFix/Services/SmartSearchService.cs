using System.Globalization;
using System.Text;
using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;
using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackEndFix.Models;

namespace Examples.WebApi.Services
{
    public class SmartSearchService
    {
        private const double THRESHOLD = 0.75;
        private readonly INormalizedStringSimilarity _stringSimilarityComparer;
        private readonly DataBaseContext _dbContext;

        public SmartSearchService(DataBaseContext dbContext)
        {
            _dbContext = dbContext;
            _stringSimilarityComparer = new JaroWinkler();
        }

        public IEnumerable<Product> Search(string query)
        {
            IEnumerable<Product> result;

            // Si la consulta está vacía o solo tiene espacios en blanco, devolvemos todos los productos
            if (string.IsNullOrWhiteSpace(query))
            {
                result = _dbContext.Products.ToList();
            }
            else
            {
                // Limpiamos la query y la separamos por espacios
                string[] queryKeys = GetKeys(ClearText(query));
                // Aquí guardaremos los productos que coincidan
                List<Product> matches = new List<Product>();

                // Obtenemos todos los productos desde la base de datos
                var productos = _dbContext.Products.ToList();

                foreach (var product in productos)
                {
                    // Limpiamos el nombre del modelo y lo separamos por espacios
                    string[] itemKeys = GetKeys(ClearText(product.Model));

                    // Si coincide alguna de las palabras de item con las de query
                    // entonces añadimos el producto a la lista de coincidencias
                    if (IsMatch(queryKeys, itemKeys))
                    {
                        matches.Add(product);
                    }
                }

                result = matches;
            }

            return result;
        }

        private bool IsMatch(string[] queryKeys, string[] itemKeys)
        {
            bool isMatch = false;

            for (int i = 0; !isMatch && i < itemKeys.Length; i++)
            {
                string itemKey = itemKeys[i];

                for (int j = 0; !isMatch && j < queryKeys.Length; j++)
                {
                    string queryKey = queryKeys[j];

                    isMatch = IsMatch(itemKey, queryKey);
                }
            }

            return isMatch;
        }

        // Hay coincidencia si las palabras son las mismas o si item contiene query o si son similares
        private bool IsMatch(string itemKey, string queryKey)
        {
            return itemKey == queryKey
                || itemKey.Contains(queryKey)
                || _stringSimilarityComparer.Similarity(itemKey, queryKey) >= THRESHOLD;
        }

        // Separa las palabras quitando los espacios
        private string[] GetKeys(string query)
        {
            return query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        }

        // Normaliza el texto 
        private string ClearText(string text)
        {
            return RemoveDiacritics(text.ToLower());
        }

        // Quita las tildes a un texto
        private string RemoveDiacritics(string text)
        {
            string normalizedString = text.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder(normalizedString.Length);

            for (int i = 0; i < normalizedString.Length; i++)
            {
                char c = normalizedString[i];
                UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }
    }
}
