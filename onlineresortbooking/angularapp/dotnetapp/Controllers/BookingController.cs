// BookingController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Service;
using System;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly BookingService _bookingService;

    public BookingController(BookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBooking(long id)
    {
        var booking = await _bookingService.GetBookingByIdAsync(id);
        if (booking == null)
        {
            return NotFound();
        }
        return Ok(booking);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBookingStatus(long id, [FromBody] string newStatus)
    {
        try
        {
            await _bookingService.UpdateBookingStatusAsync(id, newStatus);
            return Ok(new { Message = "Booking status updated successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating booking status: {ex.Message}");
        }
    }

   [Authorize(Roles = "Customer")]
   [HttpPost]
public async Task<IActionResult> AddBooking([FromBody] Booking booking)
{
    try
    {
        if (booking == null)
        {
            return BadRequest("Booking data is null");
        }

        var addedBooking = await _bookingService.AddBookingAsync(booking);
        return Ok(new { Message = "Booking added successfully.", Booking = addedBooking });
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"An error occurred while adding booking: {ex.InnerException?.Message}");
    }
}


    [Authorize(Roles = "Customer")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBooking(long id)
    {
        try
        {
            await _bookingService.DeleteBookingAsync(id);
            return Ok(new { Message = "Booking deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting booking: {ex.Message}");
        }
    }
}
