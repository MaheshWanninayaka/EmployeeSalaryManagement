using EmployeeSalaryManagement.Domain.Models;

namespace EmployeeSalaryManagement.Application
{
    public interface IEmployeeService
    {
        Task<Employee?> GetEmployeeDetailsByEmpId(int empId);
        Task<Employee> SaveEmployee(Employee employee);
    }
}
