using EmployeeSalaryManagement.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeSalaryManagement.Api.Repository;

public partial class EmployeeSalaryContext : DbContext
{
    public EmployeeSalaryContext()
    {
    }

    public EmployeeSalaryContext(DbContextOptions<EmployeeSalaryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Salary> Salaries { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=SL-NB0012\\SQLExpress;Database=EmployeeSalary;Trusted_Connection=True;TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF127BEEB10");

            entity.ToTable("Employee");

            entity.Property(e => e.EmployeeId)
                .ValueGeneratedOnAdd()
                .HasColumnName("EmployeeID");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.JoinDate).HasColumnType("date");
            entity.Property(e => e.Salary).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<Salary>(entity =>
        {
            entity.HasKey(e => e.SalaryId).HasName("PK__Salary__4BE204B7C0FEA9DB");

            entity.ToTable("Salary");

            entity.Property(e => e.SalaryId)
               .ValueGeneratedNever()
               .HasColumnName("SalaryID");
            entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Month).HasColumnType("date");
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserDeta__1788CCAC7E1FA44B");

            entity.ToTable("UserDetail");

            entity.Property(e => e.UserId)
                .ValueGeneratedOnAdd()
                .HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Password).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
