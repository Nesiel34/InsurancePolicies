using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class UserRepository(InsurancePoliciesDbContext dbContext) : IUserRepository
    {
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            List<User> users =await dbContext.Users.ToListAsync();
            return users;
        }

        async Task<int> IUserRepository.CreateAsync(User user)
        {
            await dbContext.Users.AddAsync(user);
            dbContext.SaveChanges();
            return user.ID;
        }

        async Task IUserRepository.DeleteAsync(int userID)
        {
            await dbContext.Users.Where(f=>f.ID==userID).ExecuteDeleteAsync();
            await dbContext.SaveChangesAsync();
        }

        async Task IUserRepository.UpdateAsync(User user)
        {
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
        }
    }
}
