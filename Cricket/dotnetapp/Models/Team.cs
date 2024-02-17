namespace dotnetapp.Models
{
public class Team
{
    public int TeamId { get; set; }

    // [Required(ErrorMessage = "Team name is required")]
    public string TeamName { get; set; }

    // [Required(ErrorMessage = "Team owner is required")]

    // [Required(ErrorMessage = "Established year is required")]
    public string TeamImageURL { get; set; }
    public string TeamDescription { get; set; }

    // Navigation property representing the players in the team
    public List<Player>? Players { get; set; }
}

}
