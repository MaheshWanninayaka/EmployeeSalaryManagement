using EmployeeSalaryManagement.Application;
using EmployeeSalaryManagement.Domain.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeSalaryManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private readonly IEmployeeService _employeeService;

        //used constructor dependency injection here to loosly coupled. also for dependency inversion principle
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        [Route("SaveEmployee")]
        public async Task<Employee> SaveEmployee(Employee employee)
        {
            var result = await _employeeService.SaveEmployee(employee);
            return result;
        }
        [HttpGet]
        [Route("GetEmployeeDetailsByEmpId")]
        public async Task<Employee?> GetEmployeeDetailsByEmpId(int empId)
        {
            var result = await _employeeService.GetEmployeeDetailsByEmpId(empId);
            return result;
        }

        [HttpGet]
        [Route("GetSalaryDetailsByEmpID")]
        public async Task<List<Salary>> GetSalaryDetailsByEmpID(int empId)
        {
            var result = await _employeeService.GetSalaryDetailsByEmpID(empId);
            return result;
        }


        [HttpGet]
        [Route("GetSalaryDetailsMonthAndYearwise")]
        public async Task<List<Salary>> GetSalaryDetailsMonthAndYearwise(string month,string year,int userId)
        {
            var result = await _employeeService.GetSalaryDetailsMonthAndYearwise(month,year,userId);
            return result;
        }

        [HttpGet]
        [Route("GetAllEmployeeDetails")]
        public async Task<List<Employee>> GetAllEmployeeDetails()
        {
            var result = await _employeeService.GetAllEmployeeDetails();
            return result;
        }
    }
}
