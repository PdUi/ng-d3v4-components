// https://bl.ocks.org/mbostock/444757cc9f0fde320a5f469cd36860f4
import { Component } from '@angular/core';

import { drag, event, range, scaleOrdinal, schemeCategory20, select } from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const canvas = select('canvas'),
    context = (<any> canvas.node()).getContext('2d'),
    width = canvas.property('width'),
    height = canvas.property('height'),
    radius = 32;

    const circles = range(20).map((i) => {
      return {
        index: i,
        x: Math.round(Math.random() * (width - radius * 2) + radius),
        y: Math.round(Math.random() * (height - radius * 2) + radius)
      };
    });

    const color = scaleOrdinal()
        .range(schemeCategory20);

    render();

    canvas.call(drag()
        .subject(dragsubject)
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
        .on('start.render drag.render end.render', render));

    function render() {
      context.clearRect(0, 0, width, height);
      for (let i = 0, n = circles.length, circle; i < n; ++i) {
        circle = circles[i];
        context.beginPath();
        context.moveTo(circle.x + radius, circle.y);
        context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
        context.fillStyle = color(circle.index);
        context.fill();
        if (circle.active) {
          context.lineWidth = 2;
          context.stroke();
        }
      }
    }

    function dragsubject() {
      let i = 0,
          dx,
          dy,
          d2,
          circle,
          s2 = radius * radius * 4, // Double the radius.
          subject;
      const n = circles.length;

      for (i = 0; i < n; ++i) {
        circle = circles[i];
        dx = event.x - circle.x;
        dy = event.y - circle.y;
        d2 = dx * dx + dy * dy;
        if (d2 < s2) {
          subject = circle, s2 = d2;
        }
      }

      return subject;
    }

    function dragstarted() {
      circles.splice(circles.indexOf(event.subject), 1);
      circles.push(event.subject);
      event.subject.active = true;
    }

    function dragged() {
      event.subject.x = event.x;
      event.subject.y = event.y;
    }

    function dragended() {
      event.subject.active = false;
    }
  }
}
