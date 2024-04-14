using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;   

        public List<InsurancePolicy>? Insurances { get; set; } = default!;
    }
}
