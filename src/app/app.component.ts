import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { fabric } from 'fabric';
import { skip } from 'rxjs';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  private canvas: fabric.Canvas;

  constructor(private route: ActivatedRoute) {
    this.canvas = new fabric.Canvas('canvas');
  }

  ngOnInit() {
    this.route.queryParams.pipe(skip(1)).subscribe((params) => {
      this.canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#000',
      });

      if (params) {
        fabric.Image.fromURL('/assets/background.png', (img) => {
          img.selectable = false;
          this.canvas.add(img);
        });
        fabric.Image.fromURL('/assets/textarea.png', (img) => {
          img.selectable = false;
          this.canvas.add(img);
        });
        fabric.Image.fromURL('/assets/adminframe.png', (img) => {
          img.selectable = false;
          this.canvas.add(img);
        });
        fabric.Image.fromURL(`/assets/icon/${params['job']}.png`, (img) => {
          img.selectable = false;
          img.left = 400;
          img.top = 50;
          img.scale(0.7);
          this.canvas.add(img);
        });
      }
    });
  }

  public downloadClick(): void {
    const base64 = document.getElementById('canvas') as HTMLCanvasElement;
    const link = document.createElement('a');
    link.href = base64.toDataURL('image/png');
    link.download = `test.png`;
    link.click();
  }
}
