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
        [circlesClassedFunction]="getClasses"></word-cloud>
    </div>
  `
})
export class AppComponent {
  wordCloudData: IWordCloudWord[];

  constructor() {
    populateWordCloudData();
  }

  getClasses(d): string {
    return d.word === '56' ? 'primary secondary' : '';
  }

  populateWordCloudData() {
    const data: IWordCloudWord[] = [];

    for (let i = 0, l = 99; i < l; i++) {
      const r = Math.random() * 100;
      data.push({ word: i.toString(), relativeWeight: r });
    }

    data.push({ word: '56', relativeWeight: 53 });

    this.wordCloudData = data;
  }
}
