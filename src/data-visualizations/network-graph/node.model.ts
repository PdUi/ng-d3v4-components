import { SimulationNodeDatum } from 'd3';

export interface INode extends SimulationNodeDatum {
  relativeWeight: number;
  title: string;
}
