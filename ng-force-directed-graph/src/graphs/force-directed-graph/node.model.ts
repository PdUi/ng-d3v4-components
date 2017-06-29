import { SimulationNodeDatum } from 'd3';

export interface INode extends SimulationNodeDatum {
  labelText: string;
  relativeWeight: number;
}
