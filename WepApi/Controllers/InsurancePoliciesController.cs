using Application.InsurancePolicies;
using Application.Users;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WepApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsurancePoliciesController(IInsurancePolicyService insurancePolicyService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(InsurancePolicy insurancePolicy)
        {
          int insurancePolicyID =  await insurancePolicyService.CreateInsurancePolicy(insurancePolicy);
            return Ok(insurancePolicyID);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(int UserID)
        {
            var insurancePolicies = await insurancePolicyService.GetAllInsurancePolicies(UserID);
            return Ok(insurancePolicies);
        }

        [HttpPut]
        public async Task<IActionResult> Update(InsurancePolicy insurancePolicy)
        {
            await insurancePolicyService.UpdateInsurancePolicy(insurancePolicy);
            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int insurancePolicyID)
        {
            await insurancePolicyService.DeleteInsurancePolicy(insurancePolicyID);
            return Ok();
        }
    }
}
