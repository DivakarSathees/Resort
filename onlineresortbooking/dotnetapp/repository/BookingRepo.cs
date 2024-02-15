using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Repository
{
    public interface IBookingRepo
    {
        Task<Booking> GetBookingByIdAsync(long id);
        Task<Booking> AddBookingAsync(Booking booking);
        Task DeleteBookingAsync(long id);
        Task SaveChangesAsync(); 
    }

    public class BookingRepo : IBookingRepo
    {
        private readonly ApplicationDbContext _context;

        public BookingRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Booking> GetBookingByIdAsync(long id)
        {
            return await _context.Bookings.FirstOrDefaultAsync(b => b.BookingId == id);
        }

        public async Task<Booking> AddBookingAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task DeleteBookingAsync(long id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }

        public async Task SaveChangesAsync() // Implement the SaveChangesAsync method
        {
            await _context.SaveChangesAsync();
        }
    }
}
