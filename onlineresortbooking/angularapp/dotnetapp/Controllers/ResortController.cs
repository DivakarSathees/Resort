using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Service;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Authorization.Roles;
using Microsoft.AspNetCore.Authorization;


namespace dotnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]

    public class ResortController : ControllerBase
    {
        private readonly ResortService _resortService;

        public ResortController(ResortService resortService)
        {
            _resortService = resortService;
        }
        
        [Authorize(Roles = "Customer,Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resort>>> Get()
        {
            var resorts = await _resortService.GetAllResortsAsync();
            return Ok(resorts);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Resort resort)
        {
            try
            {
                if (resort == null)
                    return BadRequest("Resort data is null");

                resort.Bookings = null;

                var newResort = await _resortService.AddResortAsync(resort);
                return CreatedAtAction(nameof(Get), new { id = newResort.ResortId }, newResort);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] Resort resort)
        {
            try
            {
                if (resort == null || resort.ResortId != id)
                    return BadRequest("Invalid resort data");

                var updatedResort = await _resortService.UpdateResortAsync(id, resort);
                if (updatedResort == null)
                {
                    return NotFound();
                }
                return Ok(updatedResort);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                var deletedResort = await _resortService.DeleteResortAsync(id);
                if (deletedResort == null)
                {
                    return NotFound();
                }
                return Ok(deletedResort);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
