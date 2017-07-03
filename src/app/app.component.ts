import { Component } from '@angular/core';

import { IWordCloudWord } from '../data-visualizations/index';

@Component({
  selector: 'app-root',
  template: `
    <div class="container half-width full-height">
      <word-cloud
        [data]="wordCloudData"
        [shouldPanAndZoom]="true"
        [circlesShouldDrag]="true"
        [circlesClassedFunction]="getClasses">
      </word-cloud>
    </div>
    <div class="container half-width full-height">
      <network-graph
        [shouldPanAndZoom]="true"
        [circlesShouldDrag]="true"
        [linksData]="forceDirectedGraphNodesLinks"
        [data]="forceDirectedGraphNodes">
      </network-graph>
    </div>
  `
})
export class AppComponent {
  wordCloudData: IWordCloudWord[];
  forceDirectedGraphNodes: any[];
  forceDirectedGraphNodesLinks: any[];

  constructor() {
    this.populateWordCloudData();
    this.populateNetworkGraphData();
  }

  getClasses(d): string {
    return d.word === '56' ? 'primary secondary' : '';
  }

  private populateWordCloudData() {
    const data: IWordCloudWord[] = [];

    for (let i = 0, l = 99; i < l; i++) {
      const r = Math.random() * 100;
      data.push({ title: i.toString(), relativeWeight: r });
    }

    data.push({ title: '56', relativeWeight: 53 });

    this.wordCloudData = data;
  }

  private populateNetworkGraphData() {
    const nodes = [];

    for (let i = 0; i < 50; i++) {
      const value = Math.ceil(Math.random() * 25);
      nodes.push({ title: i.toString(), relativeWeight: value })
    }

    const nodesLinks = [];
    const numberOfNodes = nodes.length;
    for (let iOuter = 1; iOuter < numberOfNodes; iOuter++) {
        // const l = Math.floor(Math.random() * numberOfNodes);
        // let m = Math.floor(Math.random() * numberOfNodes);
        // while (m === l) {
        //   m = Math.floor(Math.random() * numberOfNodes)
        // };
        // nodesLinks.push({ source: nodes[m].title, target: nodes[l].title });
        nodesLinks.push({ source: nodes[iOuter - 1].title, target: nodes[iOuter].title });
    }

    this.forceDirectedGraphNodes = nodes;
    this.forceDirectedGraphNodesLinks = nodesLinks;
  }
}
