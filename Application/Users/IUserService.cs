using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<int> CreateUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int userID);
    }
}
