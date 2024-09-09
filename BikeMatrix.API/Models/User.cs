namespace BikeMatrix.API.Models
{
    public class User
    {
        public long Id { get; set; }
        public required string Email { get; set; }

        public ICollection<Bike>? Bikes { get; set; }
    }
}
