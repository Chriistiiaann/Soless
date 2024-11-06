
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;

namespace PruebaSolessChristian.Models.Database.Repositories;

public abstract class Repository<TEntity, TId> : IRepository<TEntity, TId> where TEntity : class
{
    public SolessMasterContext Context { get; init; }
    private readonly IPasswordHash _passwordHash;

    public Repository(SolessMasterContext context, IPasswordHash passwordHash)
    {
        Context = context;
        _passwordHash = passwordHash;
    }

    protected Repository(SolessMasterContext context)
    {
        Context = context;
    }



    //Obtener todos los datos
    public async Task<ICollection<TEntity>> GetAllAsync()
    {
        return await Context.Set<TEntity>().ToArrayAsync();
    }

    //Obtener dato mediante valor indicado
    public IQueryable<TEntity> GetQueryable(bool asNoTracking = true)
    {
        DbSet<TEntity> entities = Context.Set<TEntity>();
        return asNoTracking ? entities.AsNoTracking() : entities;
    }

    //Obtener mediante ID
    public async Task<TEntity> GetByIdAsync(TId id)
    {
        return await Context.Set<TEntity>().FindAsync(id);
    }

    //Insertar
    public async Task<TEntity> InsertAsync(TEntity entity)
    {
        EntityEntry<TEntity> entry = await Context.Set<TEntity>().AddAsync(entity);
        await SaveAsync();
        return entry.Entity;
    }

    //Actualizar
    public async Task<TEntity> UpdateAsync(TEntity entity)
    {
        EntityEntry<TEntity> entry = Context.Set<TEntity>().Update(entity);
        await SaveAsync();
        return entry.Entity;
    }

    //Borrar
    public async Task DeleteAsync(TEntity entity)
    {
        Context.Set<TEntity>().Remove(entity);
        await SaveAsync();
    }

    //Guardar
    public async Task<bool> SaveAsync()
    {
        return await Context.SaveChangesAsync() > 0;
    }

    //Comprobar si Existe
    public async Task<bool> ExistsAsync(TId id)
    {
        return await GetByIdAsync(id) != null;
    }
}
