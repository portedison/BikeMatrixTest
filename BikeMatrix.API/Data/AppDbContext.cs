using Microsoft.EntityFrameworkCore;
using BikeMatrix.API.Models;

namespace BikeMatrix.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Bike> Bikes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Brand> Brands { get; set; }
    }
}
