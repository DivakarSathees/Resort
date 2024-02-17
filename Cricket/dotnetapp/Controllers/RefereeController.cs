// RefereeController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Route("api/referee")]
    [ApiController]
    public class RefereeController : ControllerBase
    {
        private readonly RefereeService _refereeService;

        public RefereeController(RefereeService refereeService)
        {
            _refereeService = refereeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referee>>> GetAllReferees()
        {
            var referees = await _refereeService.GetAllReferees();
            return Ok(referees);
        }

        [HttpGet("{refereeId}")]
        public async Task<ActionResult<Referee>> GetRefereeById(int refereeId)
        {
            var referee = await _refereeService.GetRefereeById(refereeId);

            if (referee == null)
            {
                return NotFound(new { message = "Cannot find any referee" });
            }

            return Ok(referee);
        }

        [HttpPost]
        public async Task<ActionResult> AddReferee([FromBody] Referee referee)
        {
            try
            {
                var success = await _refereeService.AddReferee(referee);

                if (success)
                {
                    return Ok(new { message = "Referee added successfully" });
                }
                else
                {
                    return StatusCode(500, new { message = "Failed to add referee" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{refereeId}")]
        public async Task<ActionResult> UpdateReferee(int refereeId, [FromBody] Referee referee)
        {
            try
            {
                var success = await _refereeService.UpdateReferee(refereeId, referee);

                if (success)
                {
                    return Ok(new { message = "Referee updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any referee" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{refereeId}")]
        public async Task<ActionResult> DeleteReferee(int refereeId)
        {
            try
            {
                var success = await _refereeService.DeleteReferee(refereeId);

                if (success)
                {
                    return Ok(new { message = "Referee deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any referee" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
