namespace EmployeeSalaryManagement.Application
{
    public interface IUserService
    {
        Task<string> Login(string email, string password);
    }
}
