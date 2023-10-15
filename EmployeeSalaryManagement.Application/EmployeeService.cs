using EmployeeSalaryManagement.Domain.Models;

namespace EmployeeSalaryManagement.Application
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<Employee> SaveEmployee(Employee employee)
        {
            return await _employeeRepository.SaveEmployee(employee);
        }

    }
}