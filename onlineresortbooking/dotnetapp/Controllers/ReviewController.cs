// ReviewController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Service;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService _reviewService;
        private readonly UserService _userService; // Inject UserService
        public ReviewController(ReviewService reviewService, UserService userService)
        {
            _reviewService = reviewService;
             _userService = userService; // Assign injected UserService

        }
                
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllReviews()
        {
            try
            {
                var reviews = await _reviewService.GetAllReviewsAsync();
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving reviews: {ex.Message}");
            }
        }

        // [Authorize(Roles = "Customer")]
        // [HttpPost]
        // public async Task<IActionResult> AddReview([FromBody] Review review)
        // {
        //     var addedReview = await _reviewService.AddReviewAsync(review);
        //     return Ok(addedReview);
        // }
        [Authorize(Roles = "Admin,Customer")]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetReviewsByUserId(long userId)
        {
            try
            {
                var reviews = await _reviewService.GetReviewsByUserIdAsync(userId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving reviews for user ID {userId}: {ex.Message}");
            }
        }
[Authorize(Roles = "Customer")]
[HttpPost]
public async Task<IActionResult> AddReview([FromBody] Review review)
{
    if (review == null)
    {
        return BadRequest("Review data is null");
    }

    try
    {
        if (review.User != null && review.User.UserId != review.UserId)
        {
            // If the provided user object's userId doesn't match the userId in the main object,
            // use the userId from the main object and ignore the user object.
            review.User = null;
        }

        var addedReview = await _reviewService.AddReviewAsync(review);

        // Fetch user details (including user name) based on the user ID in the review
        var user = await _userService.GetUserByIdAsync(review.UserId);
        if (user == null)
        {
            // Handle the case where the user is not found (optional)
            return BadRequest("User not found");
        }

        // Include user details in the response
        var response = new
        {
            Review = addedReview,
            User = user
        };

        return Ok(response);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"An error occurred while adding a review: {ex.Message}");
    }
}
    }
}
