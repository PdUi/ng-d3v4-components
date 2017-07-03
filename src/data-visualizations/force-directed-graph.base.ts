import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input
} from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

import {
  drag,
  event,
  forceCenter,
  forceCollide,
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
  zoom,
  zoomIdentity
} from 'd3';

import { ForceDirectedGraphNode } from './force-directed-graph-node.model';

export abstract class ForceDirectedGraphBase<T extends ForceDirectedGraphNode> implements AfterViewInit {
  @Input() data: T[] = [];
  @Input() circlesShouldDrag: boolean;
  @Input() shouldPanAndZoom: boolean;

  container: ElementRef;

  containerHeight: number;
  containerWidth: number;
  g: Selection<SVGGElement, any, HTMLElement, any>;
  radiusScale: ScaleQuantize<number>;
  simulation: Simulation<T, undefined>;

  private nodes: Selection<SVGCircleElement, T, SVGElement, any>;
  private labels: Selection<SVGTextElement, T, SVGElement, any>;
  private maxNodeRadius = 35;
  private minNodeRadius = 5;

  @Input() circlesClassedFunction: (datum: T) => string = (datum: T) => '';
  abstract applyForce(): void;
  public renderUnderNodes() {
  }

  constructor(@Inject(DOCUMENT) private document) {
  }

  ngAfterViewInit(): void {
    const containerElement = this.container.nativeElement;
    this.containerWidth = containerElement.offsetWidth;
    this.containerHeight = containerElement.offsetHeight;
    const padding = 10;

    const domainMax = max(this.data, item => item.relativeWeight);
    const domainMin = min(this.data, item => item.relativeWeight);

    this.radiusScale = scaleQuantize().range(this.getRange(this.minNodeRadius, this.maxNodeRadius))
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

    this.renderUnderNodes();

    this.nodes = this.g
          .selectAll('circle')
            .data(this.data)
            .enter()
              .append<SVGCircleElement>('circle')
                .attr('r', (datum, index, groups) => this.radiusScale(datum.relativeWeight))
                .attr('class', (datum, index, groups) => this.circlesClassedFunction(datum))
                .attr('stroke', (datum, index, groups) =>
                  rgb(document.defaultView.getComputedStyle(groups[index]).fill).darker().toString());

    this.labels = this.g.selectAll('text')
          .data(this.data)
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

    this.applyForce();
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
