// EventService.cs
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class EventService
    {
        private readonly ApplicationDbContext _context;

        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<Event> GetEventById(int eventId)
        {
            return await _context.Events.FirstOrDefaultAsync(e => e.EventId == eventId);
        }

        public async Task<bool> AddEvent(Event @event)
        {
            try
            {
                _context.Events.Add(@event);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEvent(int eventId, Event @event)
        {
            try
            {
                var existingEvent = await _context.Events.FirstOrDefaultAsync(e => e.EventId == eventId);

                if (existingEvent == null)
                {
                    return false;
                }

                @event.EventId = eventId;

                _context.Entry(existingEvent).CurrentValues.SetValues(@event);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteEvent(int eventId)
        {
            try
            {
                var existingEvent = await _context.Events.FirstOrDefaultAsync(e => e.EventId == eventId);

                if (existingEvent == null)
                {
                    return false;
                }

                _context.Events.Remove(existingEvent);
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
