using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class Schedule
    {
        public int ScheduleId { get; set; }

        // [Required(ErrorMessage = "Match date and time are required")]
        // [DataType(DataType.DateTime)]
        // [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}", ApplyFormatInEditMode = true)]
        public DateTime MatchDateTime { get; set; }

        // [Required(ErrorMessage = "Event is required")]
        public int EventId { get; set; }

        // Foreign key referencing the Event table
        public Event? Event { get; set; }

        // [Required(ErrorMessage = "Venue is required")]
        public int VenueId { get; set; }
        public Venue? Venue { get; set; }

        // [Required(ErrorMessage = "Referee is required")]
        public int RefereeId { get; set; }

        public Referee? Referee { get; set; }

        [ForeignKey("Team1Id")]
        public Team? Team1 { get; set; }

        [ForeignKey("Team2Id")]
        public Team? Team2 { get; set; }

        public int Team1Id { get; set; }

        public int Team2Id { get; set; }
    }
}
