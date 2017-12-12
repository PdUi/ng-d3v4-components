import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';

import {
  axisBottom,
  axisLeft,
  max,
  min,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10,
  select,
  Series,
  SeriesPoint,
  stack,
  stackOffsetDiverging,
  stackOrderNone
} from 'd3';

@Component({
  selector: 'stacked-bar',
  template: `<div class='fill-container' #stackedbar></div>`
})
export class StackedBarComponent implements AfterViewInit {
  @ViewChild('stackedbar') container: ElementRef;

  ngAfterViewInit(): void {
    const data = [
      {month: 'Q1-2016', apples: 3840, bananas: 1920, cherries: -1960, dates: -400},
      {month: 'Q2-2016', apples: 1600, bananas: 1440, cherries: -960, dates: -400},
      {month: 'Q3-2016', apples:  640, bananas:  960, cherries: -640, dates: -600},
      {month: 'Q4-2016', apples:  320, bananas:  480, cherries: -640, dates: -400}
    ];

    const series = stack()
      .keys(['apples', 'bananas', 'cherries', 'dates'])
      .order(stackOrderNone)
      .offset(stackOffsetDiverging)
      (data.map(d => ({ apples: d.apples, bananas: d.bananas, cherries: d.cherries, dates: d.dates})));

    const svg = select<HTMLDivElement, any>(this.container.nativeElement)
                  .append<SVGElement>('svg'),
        margin = {top: 20, right: 30, bottom: 30, left: 60},
        width = +svg.attr('width'),
        height = +svg.attr('height');

    const x = scaleBand()
        .domain(data.map((d) => d.month))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = scaleLinear()
        .domain([
          min(series, this.stackMin),
          max(series, this.stackMax)
        ])
        .rangeRound([height - margin.bottom, margin.top]);

    const z = scaleOrdinal(schemeCategory10);

    svg.append('g')
      .selectAll('g')
      .data(series)
      .enter().append('g')
        .attr('fill', (d) => z(d.key))
      .selectAll('rect')
      .data((d) => d)
      .enter().append('rect')
        .attr('width', x.bandwidth)
        .attr('x', (d) => x(d.data.month.toString()))
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => y(d[0]) - y(d[1]))

    svg.append('g')
        .attr('transform', 'translate(0,' + y(0) + ')')
        .call(axisBottom(x));

    svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',0)')
        .call(axisLeft(y));
  }

  stackMin(series: SeriesPoint<{[key: string]: number}>[]): number {
    return min(series, (d) => d[0]);
  }

  stackMax(series: SeriesPoint<{[key: string]: number}>[]): number {
    return max(series, (d) => d[1]);
  }
}
