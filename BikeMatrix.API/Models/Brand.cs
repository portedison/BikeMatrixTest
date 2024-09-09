namespace BikeMatrix.API.Models
{
    public class Brand
    {
        public long Id { get; set; }
        public required string Name { get; set; }

        public ICollection<Bike>? Bikes { get; set; } 
    }
}
