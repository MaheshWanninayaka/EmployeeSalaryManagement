using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeSalaryManagement.Domain.Models;

public partial class UserDetail
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public int? EmployeeId { get; set; }
}
