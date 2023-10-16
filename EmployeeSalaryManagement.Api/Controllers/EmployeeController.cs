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
        public async Task<Employee> GetEmployeeDetailsByEmpId(int empId)
        {
            var result = await _employeeService.GetEmployeeDetailsByEmpId(empId);
            return result;
        }
    }
}
