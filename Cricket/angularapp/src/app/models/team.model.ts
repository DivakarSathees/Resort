import { Player } from "./player.model";

export interface Team {
    teamId: number;
    teamName: string;
    teamImageURL: string;
    teamDescription: string;
    players?: Player[];
  }