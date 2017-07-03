import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild
} from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

import {
  // drag,
  // event,
  forceCenter,
  forceCollide,
  forceLink,
  // ForceLink,
  forceManyBody,
  forceSimulation,
  // min,
  // max,
  // rgb,
  // scaleQuantize,
  // ScaleQuantize,
  // select,
  Selection,
  // Simulation,
  SimulationLinkDatum,
  // zoom,
  // zoomIdentity
} from 'd3';

import { INode } from './node.model';
import { ForceDirectedGraphBase } from '../force-directed-graph.base';


@Component({
  selector: 'network-graph',
  template: `<div class="fill-container" #networkgraphcontainer></div>`
})
export class NetworkGraphComponent extends ForceDirectedGraphBase<INode> implements AfterViewInit {
  @Input() circlesShouldDrag: boolean;
  @Input() data: INode[] = [];
  @Input() linksData: SimulationLinkDatum<INode>[] = [];
  @Input() shouldPanAndZoom: boolean;

  @ViewChild('networkgraphcontainer') container: ElementRef;

  private links: Selection<SVGLineElement, SimulationLinkDatum<INode>, SVGGElement, any>;

  @Input() circlesClassedFunction: (datum: INode) => string = (datum: INode) => '';

  applyForce(): void {
    this.simulation = forceSimulation<INode, SimulationLinkDatum<INode>>(this.data)
                        .force('center', forceCenter<INode>(this.containerWidth / 2, this.containerHeight / 2))
                        .force('charge', forceManyBody<INode>())
                        .force('collide', forceCollide<INode>((datum, index, groups) => this.radiusScale(datum.relativeWeight)))
                        .on('tick', this.tick.bind(this));

    this.simulation.force('link', forceLink<INode, SimulationLinkDatum<INode>>(this.linksData)
                   .id((node) => node.title)
                   .strength(0.5));
  }

  renderUnderNodes() {
    super.renderUnderNodes();
    this.links = this.g.selectAll('line')
                       .data(this.linksData)
                       .enter()
                       .append<SVGLineElement>('line');
  }

  tick() {
    super.tick();

    this.links.attr('x1', (d: any) => d.source.x)
              .attr('y1', (d: any) => d.source.y)
              .attr('x2', (d: any) => d.target.x)
              .attr('y2', (d: any) => d.target.y);
  }
}
