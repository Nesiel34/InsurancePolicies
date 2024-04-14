namespace Application.InsurancePolicies;
using Domain.Entities;

public interface IInsurancePolicyService
{
    Task<IEnumerable<InsurancePolicy>> GetAllInsurancePolicies(int userID);
    Task<int> CreateInsurancePolicy(InsurancePolicy insurancePolicy);
    Task UpdateInsurancePolicy(InsurancePolicy insurancePolicy);
    Task DeleteInsurancePolicy(int insurancePolicyID);
}
