namespace EmployeeSalaryManagement.Application
{
    public interface IUserRepository
    {
        Task<string> Login(string email, string password);
    }
}
