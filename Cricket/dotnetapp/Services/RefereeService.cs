// RefereeService.cs
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class RefereeService
    {
        private readonly ApplicationDbContext _context;

        public RefereeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Referee>> GetAllReferees()
        {
            return await _context.Referees.ToListAsync();
        }

        public async Task<Referee> GetRefereeById(int refereeId)
        {
            return await _context.Referees.FirstOrDefaultAsync(r => r.RefereeID == refereeId);
        }

        public async Task<bool> AddReferee(Referee referee)
        {
            try
            {
                _context.Referees.Add(referee);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateReferee(int refereeId, Referee referee)
        {
            try
            {
                var existingReferee = await _context.Referees.FirstOrDefaultAsync(r => r.RefereeID == refereeId);

                if (existingReferee == null)
                {
                    return false;
                }

                referee.RefereeID = refereeId;

                _context.Entry(existingReferee).CurrentValues.SetValues(referee);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteReferee(int refereeId)
        {
            try
            {
                var existingReferee = await _context.Referees.FirstOrDefaultAsync(r => r.RefereeID == refereeId);

                if (existingReferee == null)
                {
                    return false;
                }

                _context.Referees.Remove(existingReferee);
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
