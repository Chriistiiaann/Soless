using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace PruebaSolessChristian.Models.Database.Repositories;

public class UserRepository : Repository<User, int>
{
    private readonly IPasswordHash _passwordHash;

    public UserRepository(SolessMasterContext context, IPasswordHash passwordHash) : base(context)
    {
        _passwordHash = passwordHash;
    }

    public async Task<User> InsertUserAsync(User user)
    {
        // Verificación y hasheo de la contraseña
        var password = user.GetType().GetProperty("Password");

        if (password != null && password.PropertyType == typeof(string))
        {
            var passwordValue = password.GetValue(user) as string;

            if (!string.IsNullOrEmpty(passwordValue))
            {
                password.SetValue(user, _passwordHash.Hash(passwordValue));
            }
        }

        EntityEntry<User> entry = await Context.Set<User>().AddAsync(user);
        await SaveAsync();
        return entry.Entity;
    }
}