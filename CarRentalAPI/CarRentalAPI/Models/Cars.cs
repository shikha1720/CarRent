using System.ComponentModel.DataAnnotations;

namespace CarRentalAPI.Models
{
    public class Cars
    {
        [Key]
        public int Id { get; set; }
        public string Maker { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int RentalPrice { get; set; }
        public string About { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsRented { get; set; }
        public bool AdminConfirm { get; set; }

    }
}
