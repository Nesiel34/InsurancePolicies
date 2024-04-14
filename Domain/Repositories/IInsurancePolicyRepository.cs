using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IInsurancePolicyRepository
    {
        Task<int> CreateAsync(InsurancePolicy insurancePolicy);
        Task<IEnumerable<InsurancePolicy>> GetAllAsync(int UserID);
        Task UpdateAsync(InsurancePolicy insurancePolicy);
        Task DeleteAsync(int insurancePolicyID);
    }
}
