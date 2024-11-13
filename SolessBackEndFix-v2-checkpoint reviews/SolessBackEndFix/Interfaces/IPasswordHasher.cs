namespace SolessBackend.Interfaces
{
    public interface IPasswordHasher
    {
        string Hash(string password);
    }
}
