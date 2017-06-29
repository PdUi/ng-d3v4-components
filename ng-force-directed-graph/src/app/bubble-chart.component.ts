import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';

import { ForceLink, Selection, Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { drag, event, forceCenter, forceLink, forceManyBody, forceSimulation, forceX, forceY, quadtree, select, scaleSqrt } from 'd3';

import { IBubble } from './bubble.model';
import { IBubbleLink } from './bubble-link.model';
import { IBubbleChartData } from './bubble-chart-data.model';

@Component({
  selector: 'bubble-chart',
  templateUrl: './bubble-chart.component.html'
})
export class BubbleChartComponent implements AfterViewInit {
  @Input() data: IBubbleChartData;

  private link: Selection<SVGLineElement, IBubbleLink, HTMLElement, any>;
  private nodes: Selection<SVGCircleElement, IBubble, HTMLElement, any>;
  private simulation: Simulation<IBubble, undefined>;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit(): void {
    const height = this.element.nativeElement.offsetHeight;
    const width = this.element.nativeElement.offsetWidth;
    const svg = select(this.element.nativeElement).append<SVGElement>('svg');

    this.simulation = forceSimulation<IBubble>().force('link', forceLink<IBubble, IBubbleLink>().id((node) => node.labelText))
                                                .force('charge', forceManyBody().strength(-10))
                                                .force('center', forceCenter(width / 2, height / 2));

    if (!this.data.links) {
      this.data.links = [];
      const numberOfNodes = this.data.nodes.length;
      for(let iOuter = 1; iOuter < numberOfNodes; iOuter++) {
          const l = Math.floor(Math.random() * numberOfNodes);
          let m = Math.floor(Math.random() * numberOfNodes);
          while(m === l) m = Math.floor(Math.random() * numberOfNodes);
          this.data.links.push({ source: this.data.nodes[m].labelText, target: this.data.nodes[l].labelText });
      }
    }

    this.link = svg.append('g')
                   .attr('class', 'links')
                   .selectAll('line')
                   .data(this.data.links)
                   .enter()
                     .append<SVGLineElement>('line');

    this.nodes = svg.append('g')
                   .attr('class', 'nodes')
                   .selectAll('circle')
                   .data(this.data.nodes)
                   .enter()
                     .append<SVGCircleElement>('circle')
                       .attr('r', d => d.relativeWeight)
                       .call(drag<SVGCircleElement, IBubble>()
                           .on('start', this.dragstarted.bind(this))
                           .on('drag', this.dragged.bind(this))
                           .on('end', this.dragended.bind(this)));

    this.nodes.append('title')
             .text((d) => d.labelText);

    this.simulation.nodes(this.data.nodes)
                   .on('tick', this.ticked.bind(this));

    this.simulation.force<ForceLink<IBubble, IBubbleLink>>('link')
                   .links(this.data.links);
  }

  ticked() {
    this.link.attr('x1', (d: IBubbleLink) => (<SimulationNodeDatum> d.source).x)
             .attr('y1', (d: IBubbleLink) => (<SimulationNodeDatum> d.source).y)
             .attr('x2', (d: IBubbleLink) => (<SimulationNodeDatum> d.target).x)
             .attr('y2', (d: IBubbleLink) => (<SimulationNodeDatum> d.target).y);

    this.nodes.attr('cx', (d: IBubble) => d.x)
              .attr('cy', (d: IBubble) => d.y);
  }

  dragstarted(d: IBubble) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d: IBubble) {
    d.fx = event.x;
    d.fy = event.y;
  }

  dragended(d: IBubble) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
