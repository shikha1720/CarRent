using CarRentalAPI.Context;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace CarRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public CarController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<Cars>> GetAllCars()
        {
            return Ok(await _appDbContext.Cars.ToListAsync());
        }

        [HttpPost("addcars")]
        public async Task<ActionResult<Cars>> AddCar([FromBody] Cars car)
        {
            if(car == null)
            {
                return BadRequest();
            }

             _appDbContext.Cars.Add(car);
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("GetCar/{id}")]
        public async Task<ActionResult<Cars>> GetCarById(int id)
        {
            return Ok(await _appDbContext.Cars.FindAsync(id));
        }

        [HttpGet("carInspected/{carId}/{id}")]
        public async Task<IActionResult> CarInspected(int carId, int id)
        {
            if (carId == 0 && id == 0)
            {
                return BadRequest();
            }

            var car = await _appDbContext.Cars.FirstOrDefaultAsync(c => c.Id == carId);
            var agreement = await _appDbContext.Agreements.FirstOrDefaultAsync(c => c.Id == id);
            if (agreement != null && car != null)
            {
                car.AdminConfirm = false;
                await _appDbContext.SaveChangesAsync();
                agreement.AgreementStatus = false;
                await _appDbContext.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("requestToReturn/{id}")]
        public async Task<IActionResult> ReturnRequest(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var car = await _appDbContext.Cars.FirstOrDefaultAsync(c => c.Id == id);
            if (car != null)
            {

                car.IsRented = false;
                await _appDbContext.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

    }
}
