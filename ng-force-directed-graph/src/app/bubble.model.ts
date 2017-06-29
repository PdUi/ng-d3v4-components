import { SimulationNodeDatum } from 'd3';

export interface IBubble extends SimulationNodeDatum {
  labelText: string;
  relativeWeight: number;
}
