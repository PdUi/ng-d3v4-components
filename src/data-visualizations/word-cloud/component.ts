import {
  Component,
  Input,
  ViewChild
} from '@angular/core';

import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation
} from 'd3';

import { IWordCloudWord } from './word.model';
import { ForceDirectedGraphBase } from '../force-directed-graph.base';

@Component({
  selector: 'word-cloud',
  template: `<div class="fill-container" #wordcloudcontainer></div>`
})
export class WordCloudComponent extends ForceDirectedGraphBase<IWordCloudWord> {
  @Input() data: IWordCloudWord[] = [];
  @Input() circlesShouldDrag: boolean;
  @Input() shouldPanAndZoom: boolean;

  @ViewChild('wordcloudcontainer') container;

  @Input() circlesClassedFunction: (datum: IWordCloudWord) => string = (datum: IWordCloudWord) => '';

  applyForce(): void {
    this.simulation = forceSimulation<IWordCloudWord, undefined>(this.data)
                        .alphaDecay(0.075)
                        .force('center', forceCenter<IWordCloudWord>(this.containerWidth / 2, this.containerHeight / 2))
                        .force('repulsion', forceManyBody<IWordCloudWord>().strength(2))
                        .force('collide', forceCollide<IWordCloudWord>((datum, index, groups) => this.radiusScale(datum.relativeWeight)))
                        .on('tick', this.tick.bind(this));
  }
}
