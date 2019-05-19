import { ChangeDetectionStrategy, Component } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';

@Component({
  selector: 'owm-pg-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainCanvasComponent {
  constructor(i18nService: I18nService) {}
}
