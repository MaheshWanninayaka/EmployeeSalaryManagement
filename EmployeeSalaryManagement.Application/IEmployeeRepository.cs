﻿using EmployeeSalaryManagement.Domain.Models;

namespace EmployeeSalaryManagement.Application
{
    public interface IEmployeeRepository
    {
        Task<Employee?> GetEmployeeDetailsByEmpId(int empId);
        Task<Employee> SaveEmployee(Employee employee);
    }
}
