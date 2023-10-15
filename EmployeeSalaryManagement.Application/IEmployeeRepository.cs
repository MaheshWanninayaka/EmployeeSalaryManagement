using EmployeeSalaryManagement.Domain.Models;

namespace EmployeeSalaryManagement.Application
{
    public interface IEmployeeRepository
    {
        Task<Employee> SaveEmployee(Employee employee);
    }
}
