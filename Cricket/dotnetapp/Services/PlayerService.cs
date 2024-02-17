// PlayerService.cs
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class PlayerService
    {
        private readonly ApplicationDbContext _context;

        public PlayerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Player>> GetAllPlayers()
        {
            return await _context.Players.ToListAsync();
        }

        public async Task<Player> GetPlayerById(int playerId)
        {
            return await _context.Players.FirstOrDefaultAsync(p => p.PlayerId == playerId);
        }

        public async Task<bool> AddPlayer(Player player)
        {
            try
            {
                _context.Players.Add(player);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdatePlayer(int playerId, Player player)
        {
            try
            {
                var existingPlayer = await _context.Players.FirstOrDefaultAsync(p => p.PlayerId == playerId);

                if (existingPlayer == null)
                {
                    return false;
                }

                player.PlayerId = playerId;

                _context.Entry(existingPlayer).CurrentValues.SetValues(player);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeletePlayer(int playerId)
        {
            try
            {
                var existingPlayer = await _context.Players.FirstOrDefaultAsync(p => p.PlayerId == playerId);

                if (existingPlayer == null)
                {
                    return false;
                }

                _context.Players.Remove(existingPlayer);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
