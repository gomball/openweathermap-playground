import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { fadeAnimation } from '../../animations/animations';
import { I18nService } from '../../services/i18n/i18n.service';

@Component({
  selector: 'owm-pg-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class MainCanvasComponent {
  currentRouteKey$: Observable<string>;

  constructor(i18nService: I18nService, router: Router) {
    this.currentRouteKey$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects)
    );
  }
}
