

namespace dotnetapp.Models
{
  
public class Venue
{
    public int VenueId { get; set; }

    // [Required(ErrorMessage = "Venue name is required")]
    public string VenueName { get; set; }

    public string VenueImageURL { get; set; }

    public string VenueDescription { get; set; }

    // [Required(ErrorMessage = "Venue location is required")]
    public string VenueLocation { get; set; }

    // Navigation property representing the events held at the venue
    public List<Schedule>? Schedules { get; set; }
}

}