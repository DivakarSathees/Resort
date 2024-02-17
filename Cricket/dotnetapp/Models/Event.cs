namespace dotnetapp.Models
{
    public class Event
    {
        public int EventId { get; set; }

        // [Required(ErrorMessage = "Event name is required")]
        public string EventName { get; set; }

        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        // [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }

        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        // [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; }

        // [Required(ErrorMessage = "Event image URL is required")]
        public string EventImageURL { get; set; }

        // [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }

        // Navigation property representing the teams participating in the event
        public List<Schedule>? Schedules { get; set; }

    }
}
