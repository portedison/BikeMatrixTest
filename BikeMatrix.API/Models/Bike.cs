namespace BikeMatrix.API.Models
{
    public class Bike
    {
        public long Id { get; set; }
        public required string Model { get; set; }
        public required int Year { get; set; }

        public required long OwnerId { get; set; }
        public required User Owner { get; set; }

        public required long BrandId { get; set; }
        public required Brand Brand { get; set; }
    }
}
