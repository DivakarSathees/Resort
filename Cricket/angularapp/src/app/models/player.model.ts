import { Team } from "./team.model";

export interface Player {
    playerId: number;
    playerName: string;
    age: number;
    country: string;
    battingStyle: string;
    bowlingStyle: string;
    dateOfBirth: Date;
    role: string;
    totalMatchesPlayed: number;
    totalRunsScored: number;
    totalWicketsTaken: number;
    totalCatches: number;
    teamId: number;
    team?: Team; // If you have a Team model, define it similarly
  }