import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ScaleQuantize, Selection, Simulation } from 'd3';
import { drag, event, forceCenter, forceCollide, forceManyBody, forceSimulation, min, max, rgb, scaleQuantize, select } from 'd3';

@Component({
  selector: 'app-root',
  template: `
    <div class="container half-width full-height">
      <div class="fill-container" #d3></div>
    </div>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('d3') container;

  circles: Selection<SVGCircleElement, any, SVGElement, any>;
  labels: Selection<SVGTextElement, any, SVGElement, any>;
  containerHeight: number;
  containerWidth: number;
  maxBubbleRadius = 35;
  minBubbleRadius = 5;
  radiusScale: ScaleQuantize<number>;
  simulation: Simulation<any, any>;

  constructor(@Inject(DOCUMENT) private document) {
  }

  ngAfterViewInit(): void {
    const containerElement = this.container.nativeElement;
    this.containerWidth = containerElement.offsetWidth;
    this.containerHeight = containerElement.offsetHeight;
    const padding = 10;
    const magicId = 56;

    const data = []; // [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];
    for (let i = 0, l = 100; i < l; i++) {
      let r = Math.random() * this.maxBubbleRadius;
      r = r < this.minBubbleRadius ? this.minBubbleRadius : r;
      data.push({ id: i, r: r });
    }

    const domainMax = max(data, item => item.r);
    const domainMin = min(data, item => item.r);
    // this and below are functionally equivalent
    // const circle1 = select<HTMLDivElement, any>(containerElement)
    //   .append<SVGElement>('svg')
    //     .attr('height', containerHeight - padding)
    //     .attr('width', containerWidth - padding)
    //     .append<SVGGElement>('g')
    //       .append<SVGCircleElement>('circle')
    //         .attr('r', 5)
    //         .datum(data[0]);

    // const circle2 = select<HTMLDivElement, any>(containerElement)
    //   .select<SVGElement>('svg')
    //     .select<SVGGElement>('g')
    //       .append<SVGCircleElement>('circle')
    //         .attr('r', 5)
    //         .datum(data[1]);

    // this.circles = select<HTMLDivElement, any>(containerElement)
    //   .select<SVGElement>('svg')
    //     .select<SVGGElement>('g')
    //     .selectAll<SVGCircleElement, any>('circle');

    this.radiusScale = scaleQuantize().range(this.getRange(this.minBubbleRadius, this.maxBubbleRadius))
                                      .domain([domainMin, domainMax]);

    const svg = select<HTMLDivElement, any>(containerElement)
      .append<SVGElement>('svg')
        .attr('height', this.containerHeight - padding)
        .attr('width', this.containerWidth - padding)
    this.circles = svg.append<SVGGElement>('g')
          .selectAll('circle')
            .data(data)
            .enter()
              .append<SVGCircleElement>('circle')
                .attr('r', (datum, index, groups) => this.radiusScale(datum.r))
                .classed('primary', (datum, index, groups) => datum.id === magicId)
                .attr('stroke', (datum, index, groups) =>
                  rgb(document.defaultView.getComputedStyle(groups[index]).fill).darker().toString())
                .call(drag<SVGCircleElement, any>()
                           .on('start', this.dragstarted.bind(this))
                           .on('drag', this.dragged.bind(this))
                           .on('end', this.dragended.bind(this)));

    this.labels = svg.selectAll('text')
          .data(data)
          .enter()
          .append<SVGTextElement>('text')
            .text((d) => d.r)
            .attr('text-anchor', 'middle')
            .call(drag<SVGTextElement, any>()
                           .on('start', this.dragstarted.bind(this))
                           .on('drag', this.dragged.bind(this))
                           .on('end', this.dragended.bind(this)));

    this.simulation = forceSimulation(data)
      .alphaDecay(0.075)
      .force('center', forceCenter(this.containerWidth / 2, this.containerHeight / 2))
      .force('repulsion', forceManyBody().strength(2))
      .force('collide', forceCollide((datum: any , index, groups) => this.radiusScale(datum.r)))
      .on('tick', this.tick.bind(this));
  }

  tick() {
    // these two are functionally equivalent
    // this.circles.each((datum, index, groups) => {
    //   const circleElement = groups[index];
    //   circleElement.setAttribute('cx', datum.x);
    // });

    this.circles
          .attr('cx', (datum, index, groups) => {
            const r = this.radiusScale(datum.r);
            return datum.x = Math.max(r, Math.min(this.containerWidth - r, datum.x));
          })
          .attr('cy', (datum, index, groups) => {
            const r = this.radiusScale(datum.r);
            return datum.y = Math.max(r, Math.min(this.containerHeight - r, datum.y));
          });

    this.labels
          .attr('x', (d) => d.x)
          .attr('y', (d) => d.y);
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
}
