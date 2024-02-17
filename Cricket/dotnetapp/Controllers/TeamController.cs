// TeamController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Route("api/team")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly TeamService _teamService;

        public TeamController(TeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetAllTeams()
        {
            var teams = await _teamService.GetAllTeams();
            return Ok(teams);
        }

        [HttpGet("{teamId}")]
        public async Task<ActionResult<Team>> GetTeamById(int teamId)
        {
            var team = await _teamService.GetTeamById(teamId);

            if (team == null)
            {
                return NotFound(new { message = "Cannot find any team" });
            }

            return Ok(team);
        }

        [HttpPost]
        public async Task<ActionResult> AddTeam([FromBody] Team team)
        {
            try
            {
                var success = await _teamService.AddTeam(team);

                if (success)
                {
                    return Ok(new { message = "Team added successfully" });
                }
                else
                {
                    return StatusCode(500, new { message = "Failed to add team" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{teamId}")]
        public async Task<ActionResult> UpdateTeam(int teamId, [FromBody] Team team)
        {
            try
            {
                var success = await _teamService.UpdateTeam(teamId, team);

                if (success)
                {
                    return Ok(new { message = "Team updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any team" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{teamId}")]
        public async Task<ActionResult> DeleteTeam(int teamId)
        {
            try
            {
                var success = await _teamService.DeleteTeam(teamId);

                if (success)
                {
                    return Ok(new { message = "Team deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any team" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
