import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  ViewChild
} from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

import {
  drag,
  event,
  forceCenter,
  forceCollide,
  forceLink,
  ForceLink,
  forceManyBody,
  forceSimulation,
  min,
  max,
  rgb,
  scaleQuantize,
  ScaleQuantize,
  select,
  Selection,
  Simulation,
  SimulationLinkDatum,
  zoom,
  zoomIdentity
} from 'd3';

import { INode } from './node.model';

@Component({
  selector: 'network-graph',
  template: `<div class="fill-container" #networkgraphcontainer></div>`
})
export class NetworkGraphComponent implements AfterViewInit {
  @Input() circlesShouldDrag: boolean;
  @Input() nodesData: INode[] = [];
  @Input() linksData: SimulationLinkDatum<INode>[] = [];
  @Input() shouldPanAndZoom: boolean;

  @ViewChild('networkgraphcontainer') container;

  private containerHeight: number;
  private containerWidth: number;
  private g: Selection<SVGGElement, any, HTMLElement, any>;
  private labels: Selection<SVGTextElement, INode, SVGElement, any>;
  private links: Selection<SVGLineElement, SimulationLinkDatum<INode>, SVGGElement, any>;
  private maxBubbleRadius = 35;
  private minBubbleRadius = 5;
  private nodes: Selection<SVGCircleElement, INode, SVGGElement, any>;
  private radiusScale: ScaleQuantize<number>;
  private simulation: Simulation<INode, SimulationLinkDatum<INode>>;

  @Input() circlesClassedFunction: (datum: INode) => string = (datum: INode) => '';

  constructor(@Inject(DOCUMENT) private document) {
  }

  ngAfterViewInit(): void {
    const containerElement = this.container.nativeElement;
    this.containerWidth = containerElement.offsetWidth;
    this.containerHeight = containerElement.offsetHeight;
    const padding = 10;

    const domainMax = max(this.nodesData, item => item.relativeWeight);
    const domainMin = min(this.nodesData, item => item.relativeWeight);

    this.radiusScale = scaleQuantize().range(this.getRange(this.minBubbleRadius, this.maxBubbleRadius))
                                      .domain([domainMin, domainMax]);

    const svg = select<HTMLDivElement, any>(containerElement)
                  .append<SVGElement>('svg')
                    .attr('height', this.containerHeight - padding)
                    .attr('width', this.containerWidth - padding);

    if (this.shouldPanAndZoom) {
      svg.call(zoom()
                .scaleExtent([1 / 2, 8])
                .on('zoom', this.zoomed.bind(this))
              )
         .classed('draggable', true);
    }

    this.g = svg.append<SVGGElement>('g');

    this.links = this.g.selectAll('line')
                       .data(this.linksData)
                       .enter()
                       .append<SVGLineElement>('line')
                       .classed('foo', (datum, index, groups) => {
                         console.log(datum);
                         console.log(index);
                         console.log(groups);
                         return true;
                       });

    this.nodes = this.g.selectAll('circle')
                       .data(this.nodesData)
                       .enter()
                         .append<SVGCircleElement>('circle')
                           .attr('r', (datum, index, groups) => this.radiusScale(datum.relativeWeight))
                           .attr('class', (datum, index, groups) => this.circlesClassedFunction(datum))
                           .attr('stroke', (datum, index, groups) =>
                             rgb(document.defaultView.getComputedStyle(groups[index]).fill).darker().toString());

    this.labels = this.g.selectAll('text')
                        .data(this.nodesData)
                        .enter()
                        .append<SVGTextElement>('text')
                          .text((d) => d.title)
                          .attr('text-anchor', 'middle')
                          .attr('class', (datum, index, groups) => this.circlesClassedFunction(datum))
                          .classed('small-font', (datum, index, groups) => this.radiusScale(datum.relativeWeight) < 10)
                          .classed('medium-font', (datum, index, groups) => {
                            const r = this.radiusScale(datum.relativeWeight);
                            return r >= 10 && r < 25
                          })
                          .classed('large-font', (datum, index, groups) => this.radiusScale(datum.relativeWeight) >= 25);

    if (this.circlesShouldDrag) {
      this.nodes.call(drag<SVGCircleElement, any>()
                  .on('start', this.dragstarted.bind(this))
                  .on('drag', this.dragged.bind(this))
                  .on('end', this.dragended.bind(this)))
                  .classed('draggable', true);

      this.labels.call(drag<SVGTextElement, any>()
                 .on('start', this.dragstarted.bind(this))
                 .on('drag', this.dragged.bind(this))
                 .on('end', this.dragended.bind(this)))
                 .classed('draggable', true);
    }

    this.simulation = forceSimulation<INode, SimulationLinkDatum<INode>>(this.nodesData)
                        .force('center', forceCenter<INode>(this.containerWidth / 2, this.containerHeight / 2))
                        .force('charge', forceManyBody<INode>())
                        .force('collide', forceCollide<INode>((datum, index, groups) => this.radiusScale(datum.relativeWeight)))
                        .on('tick', this.tick.bind(this));

    this.simulation.force('link', forceLink<INode, SimulationLinkDatum<INode>>(this.linksData)
                   .id((node) => node.title)
                   .strength(0.5));
  }

  tick() {
    this.nodes
          .attr('cx', (datum, index, groups) => {
            const r = this.radiusScale(datum.relativeWeight);
            return datum.x = Math.max(r, Math.min(this.containerWidth - r, datum.x));
          })
          .attr('cy', (datum, index, groups) => {
            const r = this.radiusScale(datum.relativeWeight);
            return datum.y = Math.max(r, Math.min(this.containerHeight - r, datum.y));
          });

    this.links.attr('x1', (d: any) => d.source.x)
              .attr('y1', (d: any) => d.source.y)
              .attr('x2', (d: any) => d.target.x)
              .attr('y2', (d: any) => d.target.y);

    this.labels
          .attr('x', (d) => d.x)
          .attr('y', (d) => d.y + 5);
  }

  getRange(first: number, last: number) {
    const range = [];

    for (; first <= last; first++) {
      range.push(first);
    }

    return range;
  }

  dragstarted(d) {
    if (!event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }

    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  dragended(d) {
    if (!event.active) {
      this.simulation.alphaTarget(0);
    }

    d.fx = null;
    d.fy = null;
  }

  zoomed(d) {
    this.g.attr('transform', event.transform);
  }
}
