using EmployeeSalaryManagement.Application;
using EmployeeSalaryManagement.Api.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
                    var token = GenerateJwtToken(email);
                    return token;
                }
                return "Error";

            }
            catch (Exception)
            {
                return "Error";
            }
        }

        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)); // Same secret key as in startup.cs
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
