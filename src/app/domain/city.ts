import { Coordinates } from './coordinates';

export interface City {
  id: number;
  name: string;
  country: string;
  coord: Coordinates;
}
