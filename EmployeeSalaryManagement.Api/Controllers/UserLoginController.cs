using EmployeeSalaryManagement.Application;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeSalaryManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserLoginController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("Login")]
        public async Task<string> Login(string email, string password)
        {
            var result= await _userService.Login(email, password);
            return result;
        }

    }
}
