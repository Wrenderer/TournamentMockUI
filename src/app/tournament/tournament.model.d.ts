import { Matches } from "../matches/matches.model";

export interface Tournament {
  id: number;
  name: string;
  matches: Matches[];
}