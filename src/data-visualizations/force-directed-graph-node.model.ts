import { SimulationNodeDatum } from 'd3';

export abstract class ForceDirectedGraphNode implements SimulationNodeDatum {
  relativeWeight: number;
  title: string;
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}
