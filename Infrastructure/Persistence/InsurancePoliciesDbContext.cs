using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    internal class InsurancePoliciesDbContext(DbContextOptions<InsurancePoliciesDbContext> options):DbContext(options)
    {
        internal DbSet<User> Users { get; set; }
        internal DbSet<InsurancePolicy> InsurancePolicies { get; set;}




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
               .HasKey(h=> h.ID);

            modelBuilder.Entity<InsurancePolicy>()
                .HasOne(m=>m.User)
                .WithMany(d=>d.Insurances)
                .HasForeignKey(d => d.UserID);

        }
    }
}
