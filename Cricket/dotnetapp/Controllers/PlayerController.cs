// PlayerController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Route("api/player")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerService _playerService;

        public PlayerController(PlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetAllPlayers()
        {
            var players = await _playerService.GetAllPlayers();
            return Ok(players);
        }

        [HttpGet("{playerId}")]
        public async Task<ActionResult<Player>> GetPlayerById(int playerId)
        {
            var player = await _playerService.GetPlayerById(playerId);

            if (player == null)
            {
                return NotFound(new { message = "Cannot find any player" });
            }

            return Ok(player);
        }

        [HttpPost]
        public async Task<ActionResult> AddPlayer([FromBody] Player player)
        {
            try
            {
                var success = await _playerService.AddPlayer(player);

                if (success)
                {
                    return Ok(new { message = "Player added successfully" });
                }
                else
                {
                    return StatusCode(500, new { message = "Failed to add player" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{playerId}")]
        public async Task<ActionResult> UpdatePlayer(int playerId, [FromBody] Player player)
        {
            try
            {
                var success = await _playerService.UpdatePlayer(playerId, player);

                if (success)
                {
                    return Ok(new { message = "Player updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any player" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{playerId}")]
        public async Task<ActionResult> DeletePlayer(int playerId)
        {
            try
            {
                var success = await _playerService.DeletePlayer(playerId);

                if (success)
                {
                    return Ok(new { message = "Player deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any player" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
