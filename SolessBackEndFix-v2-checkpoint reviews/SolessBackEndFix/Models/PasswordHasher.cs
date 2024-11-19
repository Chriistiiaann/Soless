using SolessBackend.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace SolessBackend.Models
{
    internal class PasswordHasher : IPasswordHasher
    {
        public string Hash(string password)
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(password);
            byte[] inputHash = SHA256.HashData(inputBytes);
            return Convert.ToBase64String(inputHash);
        }
    }
}
