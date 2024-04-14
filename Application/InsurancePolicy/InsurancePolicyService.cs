using Application.InsurancePolicies;
using Domain.Repositories;

namespace Application.InsurancePolicy;

    internal class InsurancePolicyService(IInsurancePolicyRepository insurancePolicyRepository): IInsurancePolicyService
    {
        async Task<int> IInsurancePolicyService.CreateInsurancePolicy(Domain.Entities.InsurancePolicy insurancePolicy)
        {
           return await insurancePolicyRepository.CreateAsync(insurancePolicy);
        }

        async Task IInsurancePolicyService.DeleteInsurancePolicy(int insurancePolicyID)
        {
            await insurancePolicyRepository.DeleteAsync(insurancePolicyID);
        }

        async Task<IEnumerable<Domain.Entities.InsurancePolicy>> IInsurancePolicyService.GetAllInsurancePolicies(int userID)
        {
            var insurancePolicyList = await insurancePolicyRepository.GetAllAsync(userID);
            return insurancePolicyList;
        }

        async Task IInsurancePolicyService.UpdateInsurancePolicy(Domain.Entities.InsurancePolicy insurancePolicy)
        {
            await insurancePolicyRepository.UpdateAsync(insurancePolicy);
        }
    }
