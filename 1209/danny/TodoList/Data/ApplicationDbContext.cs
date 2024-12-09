using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TodoList.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Todo> Todos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Todo>()
            .HasOne(t => t.Owner)
            .WithMany()
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<IdentityUser>(entity =>
        {
            entity.HasIndex(u => u.NormalizedEmail).IsUnique(false);
            entity.HasIndex(u => u.NormalizedUserName).IsUnique();
            entity.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(30)
                .HasAnnotation("RegularExpression", "^[a-zA-Z0-9_]{5,30}$");
        });
    }
}
