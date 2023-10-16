﻿using EmployeeSalaryManagement.Domain.Models;

namespace EmployeeSalaryManagement.Application
{
    public interface IEmployeeRepository
    {
        Task<Employee?> GetEmployeeDetailsByEmpId(int empId);
        Task<List<Salary>> GetSalaryDetailsByEmpID(int empId);
        Task<List<Salary>> GetSalaryDetailsMonthAndYearwise(string month, string year);
        Task<Employee> SaveEmployee(Employee employee);
    }
}
