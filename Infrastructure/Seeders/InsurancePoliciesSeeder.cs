using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Seeders
{
    internal class InsurancePoliciesSeeder(InsurancePoliciesDbContext dbContext) : IInsurancePoliciesSeeder
    {
        public async Task Seed()
        {
            if (dbContext.Database.GetPendingMigrations().Any())
            {
                await dbContext.Database.MigrateAsync();
            }
            if (await dbContext.Database.CanConnectAsync())
            {
                if (!dbContext.Users.Any())
                {
                    var insurancePolicies = GetInsurancePolicies();
                    dbContext.InsurancePolicies.AddRange(insurancePolicies);
                    await dbContext.SaveChangesAsync();
                }
            }
        }

        private IEnumerable<InsurancePolicy> GetInsurancePolicies()
        {
            User user1 = new User
            {
                Name = "ישראל ישראלי",
                Email = "israel@gmail.com"
            };
            User user2 = new User
            {
                Name = "אבי אברהם",
                Email = "avi@gmail.com"
            };
            List<InsurancePolicy>  insurancePolicies = [
                    new InsurancePolicy(){
                        User = user1,
                        InsuranceAmount = 500,
                        PolicyNumber = Guid.NewGuid().ToString(),
                        StartDate = DateTime.Now.AddDays(-30),
                        EndDate = DateTime.Now.AddDays(365)
                    },
                    new InsurancePolicy(){
                        User = user1,
                        InsuranceAmount = 1200,
                        PolicyNumber= Guid.NewGuid().ToString(),
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now.AddDays(30)
                    },
                    new InsurancePolicy(){
                        User = user2,
                        InsuranceAmount = 4000,
                        PolicyNumber= Guid.NewGuid().ToString(),
                        StartDate = DateTime.Now.AddDays(-180),
                        EndDate = DateTime.Now.AddDays(180)
                    }
                ];
            return insurancePolicies;
        }
    }



}
