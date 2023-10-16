using EmployeeSalaryManagement.Application;
using EmployeeSalaryManagement.Domain.Models;
using System.Net.Mail;
using System.Net;
using System.Text;
using EmployeeSalaryManagement.Api.Repository;

namespace EmployeeSalaryManagement.Infastructure.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeSalaryContext _employeeSalaryContext;

        public EmployeeRepository(EmployeeSalaryContext employeeSalaryContext)
        {
            _employeeSalaryContext = employeeSalaryContext;
        }

        public async Task<Employee> SaveEmployee(Employee employee)
        {
            try
            {
                var newEmployee = new Employee
                {
                    FullName = employee.FullName,
                    Email = employee.Email,
                    Salary = employee.Salary,
                    JoinDate = employee.JoinDate,
                    PhoneNumber = employee.PhoneNumber,
                };

                await _employeeSalaryContext.Employees.AddAsync(newEmployee);
                var result = await _employeeSalaryContext.SaveChangesAsync();

                if (result > 0)
                {
                    var temporaryPassword = TempPasswordCreator();

                    var userModel = new UserDetail
                    {
                        EmployeeId = newEmployee.EmployeeId,
                        Email = newEmployee.Email,
                        Password = temporaryPassword
                    };

                    await _employeeSalaryContext.UserDetails.AddAsync(userModel);
                    var userResult = await _employeeSalaryContext.SaveChangesAsync();

                    if (userResult > 0)
                    {
                        MailSender(temporaryPassword, userModel.Email);
                    }
                }

                return newEmployee;

            }
            catch (Exception ex)
            {
                throw new Exception("Error saving employee: " + ex.Message, ex);
            }
        }

        public string TempPasswordCreator()
        {
            var passwordLength = 8;
            var randomPassword = new StringBuilder();
            var random = new Random();

            for (int i = 0; i < passwordLength; i++)
            {
                char character = (char)random.Next(33, 126); // Generate characters between ASCII values 33 (!) and 126 (~)
                randomPassword.Append(character);
            }

            return randomPassword.ToString();

        }

        public void MailSender(string temporaryPassword, string employeeEmail)
        {
            var smtpClient = new SmtpClient("smtp.sendgrid.net")
            {
                Port = 587,
                Credentials = new NetworkCredential("apikey", "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"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("wmmaw94@gmail.com"),
                Subject = "Temporary Password",
                Body = "Your temporary password is: " + temporaryPassword,
                IsBodyHtml = false,
            };

            mailMessage.To.Add(employeeEmail);

            smtpClient.Send(mailMessage);

        }


    }
}