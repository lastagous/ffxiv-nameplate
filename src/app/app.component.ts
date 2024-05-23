import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { fabric } from 'fabric';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  canvas: any;

  constructor() {}

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.add(
      new fabric.IText("I'm a normal text", {
        fontWeight: 'normal',
      })
    );
  }
}
