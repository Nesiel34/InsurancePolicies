using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class InsurancePolicy
    {
        [Key]
        public int ID { get; set; }
        public string PolicyNumber { get; set; } = default!;
        public int InsuranceAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [ForeignKey("UserID")]
        public int? UserID { get; set; }
        public User? User { get; set; } = default!;

    }
}
