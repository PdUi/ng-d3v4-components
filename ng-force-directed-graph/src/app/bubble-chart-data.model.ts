import { IBubble } from './bubble.model';
import { IBubbleLink } from './bubble-link.model';

export interface IBubbleChartData {
  nodes: IBubble[];
  links?: IBubbleLink[];
}
