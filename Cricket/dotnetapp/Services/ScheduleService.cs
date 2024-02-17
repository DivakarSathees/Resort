// ScheduleService.cs
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class ScheduleService
    {
        private readonly ApplicationDbContext _context;

        public ScheduleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Schedule>> GetAllSchedules()
        {
            return await _context.Schedules.ToListAsync();
        }

        public async Task<Schedule> GetScheduleById(int scheduleId)
        {
            return await _context.Schedules.FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);
        }

        public async Task<bool> AddSchedule(Schedule schedule)
        {
            try
            {
                _context.Schedules.Add(schedule);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateSchedule(int scheduleId, Schedule schedule)
        {
            try
            {
                var existingSchedule = await _context.Schedules.FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

                if (existingSchedule == null)
                {
                    return false;
                }

                schedule.ScheduleId = scheduleId;

                _context.Entry(existingSchedule).CurrentValues.SetValues(schedule);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteSchedule(int scheduleId)
        {
            try
            {
                var existingSchedule = await _context.Schedules.FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

                if (existingSchedule == null)
                {
                    return false;
                }

                _context.Schedules.Remove(existingSchedule);
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
