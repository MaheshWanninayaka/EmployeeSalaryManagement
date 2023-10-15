using EmployeeSalaryManagement.Domain.Models;

namespace EmployeeSalaryManagement.Application
{
    public interface IEmployeeService
    {
        Task<Employee> SaveEmployee(Employee employee);
    }
}
