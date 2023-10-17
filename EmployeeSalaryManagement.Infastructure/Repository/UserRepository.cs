using EmployeeSalaryManagement.Application;
using EmployeeSalaryManagement.Api.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EmployeeSalaryManagement.Domain.Models;
using static System.Net.WebRequestMethods;

namespace EmployeeSalaryManagement.Infastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly EmployeeSalaryContext _employeeSalaryContext;

        public UserRepository(EmployeeSalaryContext employeeSalaryContext)
        {
            _employeeSalaryContext = employeeSalaryContext;
        }

        public async Task<string> Login(string email, string password)
        {
            try
            {
                var user = await _employeeSalaryContext.UserDetails.Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
                if (user != null)
                {
                    if ((bool)_employeeSalaryContext.Employees.Where(x => x.EmployeeId == user.EmployeeId).FirstOrDefault().IsActive)
                    {
                        var token = GenerateJwtToken(user);
                        return token;
                    }
                    else
                    {
                        return "User is deactivated";
                    }
                }
                return "Error";

            }
            catch (Exception)
            {
                return "Error";
            }
        }

        private string GenerateJwtToken(UserDetail user)
        {
            var claims = new List<Claim>
             {

                 new Claim(JwtRegisteredClaimNames.Email,user.Email.ToString()),
                 new Claim("employeeId",user.EmployeeId.ToString()),
             };

            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)); // Same secret key as in startup.cs
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256),
                Issuer = "http://localhost:44458"
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
