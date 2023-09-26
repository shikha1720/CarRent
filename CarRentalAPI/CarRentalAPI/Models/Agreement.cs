using System.ComponentModel.DataAnnotations;

namespace CarRentalAPI.Models
{
    public class Agreement
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CarId { get; set; }
        public string StartDate { get; set; }
        public int Duration { get; set; }
        public int Totalprice { get; set; }
        public bool AgreementStatus { get; set; }


    }
}
