// VenueController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Route("api/venue")]
    [ApiController]
    public class VenueController : ControllerBase
    {
        private readonly VenueService _venueService;

        public VenueController(VenueService venueService)
        {
            _venueService = venueService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venue>>> GetAllVenues()
        {
            var venues = await _venueService.GetAllVenues();
            return Ok(venues);
        }

        [HttpGet("{venueId}")]
        public async Task<ActionResult<Venue>> GetVenueById(int venueId)
        {
            var venue = await _venueService.GetVenueById(venueId);

            if (venue == null)
            {
                return NotFound(new { message = "Cannot find any venue" });
            }

            return Ok(venue);
        }

        [HttpPost]
        public async Task<ActionResult> AddVenue([FromBody] Venue venue)
        {
            try
            {
                var success = await _venueService.AddVenue(venue);

                if (success)
                {
                    return Ok(new { message = "Venue added successfully" });
                }
                else
                {
                    return StatusCode(500, new { message = "Failed to add venue" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{venueId}")]
        public async Task<ActionResult> UpdateVenue(int venueId, [FromBody] Venue venue)
        {
            try
            {
                var success = await _venueService.UpdateVenue(venueId, venue);

                if (success)
                {
                    return Ok(new { message = "Venue updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any venue" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{venueId}")]
        public async Task<ActionResult> DeleteVenue(int venueId)
        {
            try
            {
                var success = await _venueService.DeleteVenue(venueId);

                if (success)
                {
                    return Ok(new { message = "Venue deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any venue" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
