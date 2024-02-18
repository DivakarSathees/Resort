import { Player } from "./player.model";

export class Team {
    TeamId: number;
    TeamName: string;
    TeamImageURL: string;
    TeamDescription: string;
    Players?: Player[];
  }