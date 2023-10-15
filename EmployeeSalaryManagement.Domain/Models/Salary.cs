namespace EmployeeSalaryManagement.Domain.Models;

public partial class Salary
{
    public int SalaryId { get; set; }

    public int? EmployeeId { get; set; }

    public DateTime? Month { get; set; }

    public decimal? Amount { get; set; }
}
