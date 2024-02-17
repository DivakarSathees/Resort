namespace dotnetapp.Models
{
public class Player
{
    public int PlayerId { get; set; }

    // [Required(ErrorMessage = "Player name is required")]
    public string PlayerName { get; set; }

    // [Range(18, 99, ErrorMessage = "Age must be between 18 and 99")]
    public int Age { get; set; }

    // [Required(ErrorMessage = "Country is required")]
    public string Country { get; set; }

    // [Required(ErrorMessage = "Batting style is required")]
    public string BattingStyle { get; set; }

    // [Required(ErrorMessage = "Bowling style is required")]
    public string BowlingStyle { get; set; }

    // [DataType(DataType.Date)]
    // [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    // [Required(ErrorMessage = "Date of birth is required")]
    public DateTime DateOfBirth { get; set; }

    // [Required(ErrorMessage = "Role is required")]
    public string Role { get; set; }

    // [Range(0, int.MaxValue, ErrorMessage = "Total matches played must be a non-negative number")]
    public int TotalMatchesPlayed { get; set; }

    // [Range(0, int.MaxValue, ErrorMessage = "Total runs scored must be a non-negative number")]
    public int TotalRunsScored { get; set; }

    // [Range(0, int.MaxValue, ErrorMessage = "Total wickets taken must be a non-negative number")]
    public int TotalWicketsTaken { get; set; }

    // [Range(0, int.MaxValue, ErrorMessage = "Total catches must be a non-negative number")]
    public int TotalCatches { get; set; }

    // Foreign key for the Team entity
    public int TeamId { get; set; }
    public Team? Team { get; set; }
}
}