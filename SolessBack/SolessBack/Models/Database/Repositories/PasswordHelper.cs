using System.Security.Cryptography;
using System.Text;

namespace PruebaSolessChristian.Models.Database.Repositories
{
    internal class PasswordHelper : IPasswordHash
    {
        public string Hash(string password)
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(password);
            byte[] inputHash = SHA256.HashData(inputBytes);
            return Convert.ToBase64String(inputHash);
        }
    }
}
