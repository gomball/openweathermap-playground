import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'owm-pg-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainCanvasComponent {}
