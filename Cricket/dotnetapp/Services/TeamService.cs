// TeamService.cs
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class TeamService
    {
        private readonly ApplicationDbContext _context;

        public TeamService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Team>> GetAllTeams()
        {
            return await _context.Teams.ToListAsync();
        }

        public async Task<Team> GetTeamById(int teamId)
        {
            return await _context.Teams.FirstOrDefaultAsync(t => t.TeamId == teamId);
        }

        public async Task<bool> AddTeam(Team team)
        {
            try
            {
                _context.Teams.Add(team);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateTeam(int teamId, Team team)
        {
            try
            {
                var existingTeam = await _context.Teams.FirstOrDefaultAsync(t => t.TeamId == teamId);

                if (existingTeam == null)
                {
                    return false;
                }

                team.TeamId = teamId;

                _context.Entry(existingTeam).CurrentValues.SetValues(team);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteTeam(int teamId)
        {
            try
            {
                var existingTeam = await _context.Teams.FirstOrDefaultAsync(t => t.TeamId == teamId);

                if (existingTeam == null)
                {
                    return false;
                }

                _context.Teams.Remove(existingTeam);
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
