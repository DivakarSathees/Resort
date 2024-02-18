import { Player } from "./player.model";

export class Team {
    teamId: number;
    teamName: string;
    teamImageURL: string;
    teamDescription: string;
    players?: Player[];
  }