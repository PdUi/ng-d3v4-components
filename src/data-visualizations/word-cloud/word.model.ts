import { SimulationNodeDatum } from 'd3';

export interface IWordCloudWord extends SimulationNodeDatum {
  relativeWeight: number;
  title: string;
}
