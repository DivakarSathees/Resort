using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Service
{
    public interface BookingService
    {
        Task<Booking> GetBookingByIdAsync(long id);
        Task<Booking> AddBookingAsync(Booking booking);
        Task DeleteBookingAsync(long id);
        Task UpdateBookingStatusAsync(long id, string newStatus);
    }
}
