import { Schedule } from "./schedule.model";


export class Venue {
    venueId: number;
    venueName: string;
    venueImageURL: string;
    venueDescription: string;
    venueLocation: string;
    schedules?: Schedule[];
  }