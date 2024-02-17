// VenueService.cs
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class VenueService 
    {
        private readonly ApplicationDbContext _context;

        public VenueService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Venue>> GetAllVenues()
        {
            return await _context.Venues.ToListAsync();
        }

        public async Task<Venue> GetVenueById(int venueId)
        {
            return await _context.Venues.FirstOrDefaultAsync(v => v.VenueId == venueId);
        }

        public async Task<bool> AddVenue(Venue venue)
        {
            try
            {
                _context.Venues.Add(venue);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateVenue(int venueId, Venue venue)
        {
            try
            {
                var existingVenue = await _context.Venues.FirstOrDefaultAsync(v => v.VenueId == venueId);

                if (existingVenue == null)
                {
                    return false;
                }

                venue.VenueId = venueId;

                _context.Entry(existingVenue).CurrentValues.SetValues(venue);
                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteVenue(int venueId)
        {
            try
            {
                var venue = await _context.Venues.FirstOrDefaultAsync(v => v.VenueId == venueId);

                if (venue == null)
                {
                    return false;
                }

                _context.Venues.Remove(venue);
                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
