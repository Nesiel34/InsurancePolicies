using Domain.Repositories;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using Infrastructure.Seeders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("InsurancePoliciesDb");
        services.AddDbContext<InsurancePoliciesDbContext>(options =>
            options.UseSqlServer(connectionString)
                .EnableSensitiveDataLogging());

        services.AddScoped<IInsurancePoliciesSeeder, InsurancePoliciesSeeder>();
        services.AddScoped<IUserRepository,UserRepository>();
        services.AddScoped<IInsurancePolicyRepository, InsurancePolicyRepository>();



    }
}