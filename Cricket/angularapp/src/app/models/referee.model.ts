import { Schedule } from "./schedule.model";

export class Referee {
    refereeID: number;
    refereeName: string;
    noOfMatches: number;
    refereeImageURL: string;
    schedules?: Schedule[];
  }