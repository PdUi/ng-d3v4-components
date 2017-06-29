// https://bl.ocks.org/mbostock/2675ff61ea5e063ede2b5d63c08020c7
import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';

import { Selection, SimulationNodeDatum } from 'd3';
import { forceCenter, forceCollide, forceSimulation, forceX, forceY, range, select } from 'd3';

@Component({
  selector: 'bubble-graph',
  template: ''
})
export class BubbleGraphComponent implements AfterViewInit {
  @Input() bubblesData: any[];

  constructor(private element: ElementRef) {
  }

  private nodes: Selection<SVGElement, any, Element, {}>;
  private labels: Selection<SVGTextElement, any, Element, {}>;
  private width: number;
  private height: number;

  ngAfterViewInit(): void {
    this.height = +this.element.nativeElement.offsetHeight;
    this.width = +this.element.nativeElement.offsetWidth;
    const svg = select(this.element.nativeElement).append<SVGElement>('svg')
                                                     .attr('height', this.height)
                                                     .attr('width', this.width);

    this.nodes = svg.append('g')
                   .attr('class', 'nodes')
                   .selectAll('circle')
                   .data(this.bubblesData)
                   .enter()
                     .append<SVGCircleElement>('circle')
                       .attr('r', d => d.relativeWeight);

    this.labels = svg.select('g')
                   .attr('class', 'labels')
                   .selectAll('text')
                   .data(this.bubblesData)
                   .enter()
                     .append<SVGTextElement>('text')
                     .text(d => d.labelText)
                     .attr('text-anchor', 'middle');

    var simulation = forceSimulation<any, any>(this.bubblesData)
        .velocityDecay(0.2)
        .force("x", forceX().strength(-0.0055))
        .force("y", forceY().strength(-0.0055))
        .force('center', forceCenter(this.width / 2, this.height / 2))
        .on("tick", this.ticked.bind(this));
  }

  ticked() {
    this.nodes.attr('cx', (d) => d.x)
              .attr('cy', (d) => d.y);
    this.labels.attr('x', (d) => d.x)
              .attr('y', (d) => d.y);
    }
}
