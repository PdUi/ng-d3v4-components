import { Component } from '@angular/core';

import { BaseType, ScaleOrdinal, Selection } from 'd3';
import { drag, event, range, scaleOrdinal, schemeCategory20, select } from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private circles: { index: number, x: number, y: number }[];
  private context: CanvasRenderingContext2D;
  private height: number;
  private width: number;
  private radius = 32;
  private color: ScaleOrdinal<string, string>;

  constructor() {
    const canvas: Selection<HTMLCanvasElement, {}, HTMLElement, any> = select<HTMLCanvasElement, {}>('canvas');
    this.width = +canvas.property('width');
    this.height = +canvas.property('height');
    this.context = canvas.node().getContext('2d');

    this.circles = range(20).map((i) => {
      return {
        index: i,
        x: Math.round(Math.random() * (this.width - this.radius * 2) + this.radius),
        y: Math.round(Math.random() * (this.height - this.radius * 2) + this.radius)
      };
    });

    this.color = scaleOrdinal<string, string>().range(schemeCategory20);

    this.render();

    canvas.call(drag()
        .subject(this.dragsubject.bind(this))
        .on('start', this.dragstarted.bind(this))
        .on('drag', this.dragged.bind(this))
        .on('end', this.dragended.bind(this))
        .on('start.render drag.render end.render', this.render.bind(this)));
  }

  dragended() {
    event.subject.active = false;
  }

  dragstarted() {
    this.circles.splice(this.circles.indexOf(event.subject), 1);
    this.circles.push(event.subject);
    event.subject.active = true;
  }

  dragged() {
    event.subject.x = event.x;
    event.subject.y = event.y;
  }

  dragsubject() {
    let s2 = this.radius * this.radius * 4; // Double the radius.
    let subject;
    const n = this.circles.length;

    for (let i = 0; i < n; ++i) {
      const circle = this.circles[i];
      const dx = event.x - circle.x;
      const dy = event.y - circle.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < s2) {
        subject = circle;
        s2 = d2;
      }
    }

    return subject;
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (let i = 0, n = this.circles.length, circle; i < n; ++i) {
      circle = this.circles[i];
      this.context.beginPath();
      this.context.moveTo(circle.x + this.radius, circle.y);
      this.context.arc(circle.x, circle.y, this.radius, 0, 2 * Math.PI);
      this.context.fillStyle = this.color(circle.index);
      this.context.fill();
      if (circle.active) {
        this.context.lineWidth = 2;
        this.context.stroke();
      }
    }
  }
}
