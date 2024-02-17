import { Schedule } from "./schedule.model";

export interface Referee {
    refereeID: number;
    refereeName: string;
    noOfMatches: number;
    refereeImageURL: string;
    schedules?: Schedule[];
  }