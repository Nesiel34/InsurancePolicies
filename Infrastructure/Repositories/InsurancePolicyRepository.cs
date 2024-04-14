using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class InsurancePolicyRepository(InsurancePoliciesDbContext dbContext) : IInsurancePolicyRepository
    {
        async Task<int> IInsurancePolicyRepository.CreateAsync(InsurancePolicy insurancePolicy)
        {
            await dbContext.InsurancePolicies.AddAsync(insurancePolicy);
           dbContext.SaveChanges();
            return insurancePolicy.ID;
        }

        async Task IInsurancePolicyRepository.DeleteAsync(int insurancePolicyID)
        {
            await dbContext.InsurancePolicies.Where(w => w.ID == insurancePolicyID).ExecuteDeleteAsync();
            await dbContext.SaveChangesAsync();
        }

        async Task<IEnumerable<InsurancePolicy>> IInsurancePolicyRepository.GetAllAsync(int userID)
        {
            var insurancePolicyList = await dbContext.InsurancePolicies.Where(w=>w.UserID==userID).ToListAsync();
            return insurancePolicyList;
        }

        async Task IInsurancePolicyRepository.UpdateAsync(InsurancePolicy insurancePolicy)
        {
             dbContext.InsurancePolicies.Update(insurancePolicy);
            await dbContext.SaveChangesAsync();
        }
    }
}
