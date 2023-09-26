using CarRentalAPI.Context;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgreementController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public AgreementController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("agreement")]
        public async Task<ActionResult<Agreement>> SaveAgreement(Agreement agreement)
        {
            if (agreement == null)
            {
                return BadRequest();
            }
            int carId = agreement.CarId;
            await _appDbContext.Cars.FindAsync(carId);

            var carToUpdate = await _appDbContext.Cars.FirstOrDefaultAsync(c => c.Id == carId);
            if (carToUpdate != null)
            {

                carToUpdate.IsRented = true;
                carToUpdate.AdminConfirm = true;
                await _appDbContext.SaveChangesAsync();
            }
            else
            {
                Console.WriteLine("Car not found.");
            }

            await _appDbContext.Agreements.AddAsync(agreement);
            await _appDbContext.SaveChangesAsync();

            return Ok();

        }

        [HttpGet("userAgreements/{id}")]
        public async Task<IActionResult> GetUserAgreements(int id)
        {
            //var agreement = await _appDbContext.Agreements.Where(x => x.UserId == userId).ToListAsync();
            var myAgreement = await (
                from a in _appDbContext.Agreements
                join c in _appDbContext.Cars on a.CarId equals c.Id
                where a.UserId == id
                select new
                {
                    a.Id,
                    a.CarId,
                    a.StartDate,
                    a.Duration,
                    a.Totalprice,
                    a.AgreementStatus,
                    c.Maker,
                    c.Model,
                }
                ).ToListAsync();

            return Ok(myAgreement);
        }

        [HttpGet("allAgreements")]
        public async Task<IActionResult> GetAllAgreements()
        {
            var allAgreements = await (
                from a in _appDbContext.Agreements
                join c in _appDbContext.Cars
                on a.CarId equals c.Id
                join u in _appDbContext.Users on a.UserId equals u.Id
                select new
                {
                    a.Id,
                    a.CarId,
                    a.UserId,
                    a.StartDate,
                    a.Duration,
                    a.Totalprice,
                    a.AgreementStatus,
                    c.Maker,
                    c.Model,
                    c.IsRented,
                    u.FirstName,
                    u.LastName,
                    u.Email,
                    u.Username,

                }).ToListAsync();

            return Ok(allAgreements);
        }

        [HttpPut("UpdateAgreement/{id}/{duration}")]
        public async Task<IActionResult> UpdateAgreement(int id, int duration)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var agreement = await _appDbContext.Agreements.FindAsync(id);
            if (agreement != null)
            {
                agreement.Duration = duration;
                _appDbContext.Update(agreement);
                await _appDbContext.SaveChangesAsync();

                return Ok("Updated successfully.");
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpDelete("deleteAgreement/{id}")]
        public async Task<IActionResult> DeleteAgreement(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var agreement = await _appDbContext.Agreements.FindAsync(id);
            if (agreement != null)
            {
                var car = agreement.CarId;
                var carToUpdate = await _appDbContext.Cars.FindAsync(car);
                if (carToUpdate != null)
                {
                    carToUpdate.IsRented = false;
                    carToUpdate.AdminConfirm = false;
                    await _appDbContext.SaveChangesAsync();
                }

                _appDbContext.Agreements.Remove(agreement);
                await _appDbContext.SaveChangesAsync();
                return Ok("Deleted Successfully.");
            }
            else
            {
                return BadRequest();
            }

        }
    }
}
