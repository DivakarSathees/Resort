import { Referee } from "./referee.model";
import { Team } from "./team.model";
import { Venue } from "./venue.model";

export class Schedule {
    scheduleId: number;
    matchDateTime: Date;
    eventId: number;
    event?: Event; // If you have an Event model, define it similarly
    venueId: number;
    venue?: Venue; // If you have a Venue model, define it similarly
    refereeId: number;
    referee?: Referee; // If you have a Referee model, define it similarly
    team1?: Team; // If you have a Team model, define it similarly
    team2?: Team; // If you have a Team model, define it similarly
    team1Id: number;
    team2Id: number;
  }