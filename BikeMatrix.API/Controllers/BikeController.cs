using BikeMatrix.API.Data;
using BikeMatrix.API.DTOs;
using BikeMatrix.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace BikeMatrix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowFrontendApp")]
    public class BikesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BikesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/bikes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BikeDTO>>> GetBikes()
        {
            var bikes = await _context.Bikes
                .Include(b => b.Owner)
                .Include(b => b.Brand)
                .ToListAsync();

            var bikeDTOs = bikes.Select(b => new BikeDTO
            {
                Id = b.Id,
                Model = b.Model,
                Year = b.Year,
                Owner = new OwnerDTO { Email = b.Owner.Email },
                Brand = new BrandDTO { Name = b.Brand.Name }
            });

            return Ok(bikeDTOs);
        }

        // GET: api/bikes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BikeDTO>> GetBike(long id)
        {
            var bike = await _context.Bikes
                .Include(b => b.Owner)
                .Include(b => b.Brand)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bike == null)
            {
                return NotFound();
            }

            var bikeDTO = new BikeDTO
            {
                Id = bike.Id,
                Model = bike.Model,
                Year = bike.Year,
                Owner = new OwnerDTO { Email = bike.Owner.Email },
                Brand = new BrandDTO { Name = bike.Brand.Name }
            };

            return Ok(bikeDTO);
        }

        // POST: api/bikes
        [HttpPost]
        public async Task<ActionResult<BikeDTO>> PostBike(BikeCreateDTO bikeDto)
        {
            // Check if the owner exists by email
            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Email == bikeDto.Owner.Email);
            if (owner == null)
            {
                owner = new User { Email = bikeDto.Owner.Email };
                _context.Users.Add(owner);
            }

            // Check if the brand exists by name
            var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Name == bikeDto.Brand.Name);
            if (brand == null)
            {
                brand = new Brand { Name = bikeDto.Brand.Name };
                _context.Brands.Add(brand);
            }

            await _context.SaveChangesAsync();

            // Create the new bike
            var bike = new Bike
            {
                Model = bikeDto.Model,
                Year = bikeDto.Year,
                OwnerId = owner.Id,
                Owner = owner,
                BrandId = brand.Id,
                Brand = brand
            };

            _context.Bikes.Add(bike);
            await _context.SaveChangesAsync();

            var createdBikeDTO = new BikeDTO
            {
                Id = bike.Id,
                Model = bike.Model,
                Year = bike.Year,
                Owner = new OwnerDTO { Email = owner.Email },
                Brand = new BrandDTO { Name = brand.Name }
            };

            return CreatedAtAction(nameof(GetBike), new { id = bike.Id }, createdBikeDTO);
        }

        // PUT: api/bikes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBike(long id, BikeUpdateDTO bikeDto)
        {
            if (id != bikeDto.Id)
            {
                return BadRequest("Bike ID mismatch.");
            }

            // Check if the owner exists by email
            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Email == bikeDto.Owner.Email);
            if (owner == null)
            {
                owner = new User { Email = bikeDto.Owner.Email };
                _context.Users.Add(owner);
                await _context.SaveChangesAsync();
            }

            // Check if the brand exists by name
            var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Name == bikeDto.Brand.Name);
            if (brand == null)
            {
                brand = new Brand { Name = bikeDto.Brand.Name };
                _context.Brands.Add(brand);
                await _context.SaveChangesAsync();
            }

            // Find the existing bike
            var existingBike = await _context.Bikes.FindAsync(id);
            if (existingBike == null)
            {
                return NotFound("Bike not found.");
            }

            // Update the bike's properties
            existingBike.Model = bikeDto.Model;
            existingBike.Year = bikeDto.Year;
            existingBike.OwnerId = owner.Id;
            existingBike.BrandId = brand.Id;

            _context.Entry(existingBike).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BikeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/bikes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBike(long id)
        {
            var bike = await _context.Bikes.FindAsync(id);
            if (bike == null)
            {
                return NotFound();
            }

            _context.Bikes.Remove(bike);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BikeExists(long id)
        {
            return _context.Bikes.Any(e => e.Id == id);
        }
    }
}
