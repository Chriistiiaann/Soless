namespace PruebaSolessChristian.Models.Database.Repositories
{
    public interface IPasswordHash
    {
        string Hash(string password);
    }
}
