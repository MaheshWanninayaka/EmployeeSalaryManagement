using EmployeeSalaryManagement.Application;
using EmployeeSalaryManagement.Domain.Models;
using System.Net.Mail;
using System.Net;
using System.Text;
using EmployeeSalaryManagement.Api.Repository;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

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
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
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
                        IsActive = employee.IsActive,
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
                    scope.Complete();
                    return newEmployee;

                }
                catch (Exception ex)
                {
                    throw new Exception("Error saving employee: " + ex.Message, ex);
                }
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

        public async Task<Employee?> GetEmployeeDetailsByEmpId(int empId)
        {
            try
            {
                var result = await _employeeSalaryContext.Employees.Where(x => x.EmployeeId == empId).FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting employee: " + ex.Message, ex);
            }
        }

        public async Task<List<Salary>> GetSalaryDetailsByEmpID(int empId)
        {
            try
            {
                var result = await _employeeSalaryContext.Salaries.Where(x => x.EmployeeId == empId).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting employee salaries: " + ex.Message, ex);
            }
        }

        public async Task<List<Salary>> GetSalaryDetailsMonthAndYearwise(string month, string year, int userId)
        {
            try
            {
                var result = new List<Salary>();
                if (!string.IsNullOrEmpty(month) && month != "undefined")
                {
                    result = await _employeeSalaryContext.Salaries.Where(x => x.EmployeeId == userId && x.Month.Value.Month == Int32.Parse(month) && x.Month.Value.Year == Int32.Parse(year)).ToListAsync();
                }
                else
                {
                    result = await _employeeSalaryContext.Salaries.Where(x => x.EmployeeId == userId && x.Month.Value.Year == Int32.Parse(year)).ToListAsync();
                }
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting employee salaries: " + ex.Message, ex);
            }
        }

        public async Task<List<Employee>> GetAllEmployeeDetails()
        {
            try
            {
                var result = await _employeeSalaryContext.Employees.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting all employees: " + ex.Message, ex);
            }
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var existingEmployee = await _employeeSalaryContext.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employee.EmployeeId);

                    if (existingEmployee != null)
                    {
                        existingEmployee.FullName = employee.FullName;
                        existingEmployee.Email = employee.Email;
                        existingEmployee.Salary = employee.Salary;
                        existingEmployee.JoinDate = employee.JoinDate;
                        existingEmployee.PhoneNumber = employee.PhoneNumber;
                        existingEmployee.IsActive = employee.IsActive;

                        _employeeSalaryContext.Entry(existingEmployee).State = EntityState.Modified;

                        var result = await _employeeSalaryContext.SaveChangesAsync();


                        scope.Complete();
                        return existingEmployee;
                    }

                    throw new Exception("Employee not found or error updating employee.");

                }
                catch (Exception ex)
                {
                    throw new Exception("Error saving employee: " + ex.Message, ex);
                }
            }
        }
    }
}