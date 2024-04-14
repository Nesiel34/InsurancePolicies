using Application.InsurancePolicies;
using Application.InsurancePolicy;
using Application.Users;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IInsurancePolicyService, InsurancePolicyService>();
        services.AddScoped<IUserService,UserService>();


    }
}