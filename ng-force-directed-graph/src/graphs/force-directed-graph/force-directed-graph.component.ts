// https://bl.ocks.org/mbostock/2675ff61ea5e063ede2b5d63c08020c7
import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';

import { ForceLink, Selection, Simulation, SimulationNodeDatum } from 'd3';
import { drag, event, forceCenter, forceLink, forceManyBody, forceSimulation, select } from 'd3';

import { INode } from './node.model';
import { INodesLink } from './nodes-link.model';

@Component({
  selector: 'force-directed-graph',
  template: ''
})
export class ForceDirectedGraphComponent implements AfterViewInit {
  @Input() nodesData: INode[];
  @Input() linksData: INodesLink[] = [];

  private link: Selection<SVGLineElement, INodesLink, SVGElement, any>;
  private nodes: Selection<SVGCircleElement, INode, SVGElement, any>;
  private simulation: Simulation<INode, undefined>;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit(): void {
    const height = this.element.nativeElement.offsetHeight;
    const width = this.element.nativeElement.offsetWidth;
    const svg = select(this.element.nativeElement).append<SVGElement>('svg');

    this.simulation = forceSimulation<INode>().force('link', forceLink<INode, INodesLink>().id((node) => node.labelText))
                                                .force('charge', forceManyBody().strength(-10))
                                                .force('center', forceCenter(width / 2, height / 2));

    this.link = svg.append('g')
                   .attr('class', 'links')
                   .selectAll('line')
                   .data(this.linksData)
                   .enter()
                     .append<SVGLineElement>('line');

    this.nodes = svg.append('g')
                   .attr('class', 'nodes')
                   .selectAll('circle')
                   .data(this.nodesData)
                   .enter()
                     .append<SVGCircleElement>('circle')
                       .attr('r', d => d.relativeWeight)
                       .call(drag<SVGCircleElement, INode>()
                           .on('start', this.dragstarted.bind(this))
                           .on('drag', this.dragged.bind(this))
                           .on('end', this.dragended.bind(this)));

    this.nodes.append('title')
             .text((d) => d.labelText);

    this.simulation.nodes(this.nodesData)
                   .on('tick', this.ticked.bind(this));

    this.simulation.force<ForceLink<INode, INodesLink>>('link')
                   .links(this.linksData);
  }

  ticked() {
    this.link.attr('x1', (d: INodesLink) => (<SimulationNodeDatum> d.source).x)
             .attr('y1', (d: INodesLink) => (<SimulationNodeDatum> d.source).y)
             .attr('x2', (d: INodesLink) => (<SimulationNodeDatum> d.target).x)
             .attr('y2', (d: INodesLink) => (<SimulationNodeDatum> d.target).y);

    this.nodes.attr('cx', (d: INode) => d.x)
              .attr('cy', (d: INode) => d.y);
  }

  dragstarted(d: INode) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d: INode) {
    d.fx = event.x;
    d.fy = event.y;
  }

  dragended(d: INode) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
