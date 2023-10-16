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

        public async Task<Employee?> GetEmployeeDetailsByEmpId(int empId)
        {
            return await _employeeRepository.GetEmployeeDetailsByEmpId(empId);
        }

        public async Task<List<Salary>> GetSalaryDetailsByEmpID(int empId)
        {
            return await _employeeRepository.GetSalaryDetailsByEmpID(empId);
        }

        public async Task<List<Salary>> GetSalaryDetailsMonthAndYearwise(string month, string year)
        {
            return await _employeeRepository.GetSalaryDetailsMonthAndYearwise(month,year);
        }

        public async Task<Employee> SaveEmployee(Employee employee)
        {
            return await _employeeRepository.SaveEmployee(employee);
        }

    }
}