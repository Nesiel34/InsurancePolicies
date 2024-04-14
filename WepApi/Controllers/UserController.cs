using Application.Users;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WepApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            int id =await userService.CreateUser(user);
            return Ok(id);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await  userService.GetAllUsers();
            return Ok(users);
        }

        [HttpPut]
        public async Task<IActionResult> Update(User user)
        {
            await userService.UpdateUser(user);
            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int userID)
        {
            await userService.DeleteUser(userID);
            return Ok();
        }

 
    }
}
