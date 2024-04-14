using Domain.Entities;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    internal class UserService(IUserRepository userRepository) : IUserService
    {
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await userRepository.GetAllAsync();
            return users;
        }

        async Task<int> IUserService.CreateUser(User user)
        {
           return await userRepository.CreateAsync(user);
        }

        async Task IUserService.DeleteUser(int userID)
        {
            await userRepository.DeleteAsync(userID);
        }

        async Task IUserService.UpdateUser(User user)
        {
            await userRepository.UpdateAsync(user);
        }
    }
}
