namespace BikeMatrix.API.DTOs
{
    public class BikeDTO
    {
        public long Id { get; set; }
        public required string Model { get; set; }
        public int Year { get; set; }
        public required OwnerDTO Owner { get; set; }
        public required BrandDTO Brand { get; set; }
    }

    public class BikeCreateDTO
    {
        public required string Model { get; set; }
        public required int Year { get; set; }
        public required OwnerDTO Owner { get; set; }
        public required BrandDTO Brand { get; set; }
    }
    public class BikeUpdateDTO
    {
        public long Id { get; set; }
        public required string Model { get; set; }
        public int Year { get; set; }
        public required OwnerDTO Owner { get; set; }
        public required BrandDTO Brand { get; set; }
    }
}
