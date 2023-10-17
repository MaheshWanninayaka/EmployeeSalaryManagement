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

        public async Task<List<Employee>> GetAllEmployeeDetails()
        {
            return await _employeeRepository.GetAllEmployeeDetails();
        }

        public async Task<Employee?> GetEmployeeDetailsByEmpId(int empId)
        {
            return await _employeeRepository.GetEmployeeDetailsByEmpId(empId);
        }

        public async Task<List<Salary>> GetSalaryDetailsByEmpID(int empId)
        {
            return await _employeeRepository.GetSalaryDetailsByEmpID(empId);
        }

        public async Task<List<Salary>> GetSalaryDetailsMonthAndYearwise(string month, string year, int userId)
        {
            return await _employeeRepository.GetSalaryDetailsMonthAndYearwise(month,year,userId);
        }

        public async Task<Employee> SaveEmployee(Employee employee)
        {
            return await _employeeRepository.SaveEmployee(employee);
        }

    }
}