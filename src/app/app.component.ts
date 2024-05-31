import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { skip } from 'rxjs';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement> | undefined;

  private context: CanvasRenderingContext2D | undefined | null;

  constructor(private route: ActivatedRoute) {}

  async ngAfterViewInit(): Promise<void> {
    this.context = this.canvas?.nativeElement.getContext('2d');
    this.route.queryParams.pipe(skip(1)).subscribe(async (params) => {
      if (this.context) {
        await this.drawImage(this.context, 'assets/background.png');
        await this.drawImage(this.context, 'assets/textarea.png');
        if (params['admin'] === '1') {
          await this.drawImage(this.context, 'assets/adminframe.png');
        }
        await this.drawImage(
          this.context,
          `assets/icon/${params['job']}.png`,
          400,
          50,
          0.7
        );
      } else {
        console.log('Could not load canvas.');
      }
    });
  }

  private async drawImage(
    context: CanvasRenderingContext2D,
    src: string,
    x: number = 0,
    y: number = 0,
    scale: number = 1
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => {
        console.log(`[success] ${src} loaded.`);
        context.drawImage(
          image,
          x,
          y,
          image.width * scale,
          image.height * scale
        );
        resolve();
      });
      image.addEventListener('error', () => {
        console.log(`[error] ${src} path iamge.`);
        reject();
      });
      image.src = src;
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
