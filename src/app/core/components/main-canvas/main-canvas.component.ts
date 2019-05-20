import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { fadeAnimation } from '../../animations/animations';
import { I18nService } from '../../services/i18n/i18n.service';
import { ModalService } from '../../services/modal/modal.service';
import { StorageService } from '../../services/storage/storage.service';
import { SystemQuery } from '../../state/system/system.query';
import { SystemService } from '../../state/system/system.service';
import { OwmAppidPrompterComponent } from '../owm-appid-prompter/owm-appid-prompter.component';

@Component({
  selector: 'owm-pg-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class MainCanvasComponent {
  currentRouteKey$: Observable<string>;

  constructor(
    i18nService: I18nService,
    systemService: SystemService,
    systemQuery: SystemQuery,
    modalService: ModalService,
    storageService: StorageService,
    router: Router
  ) {
    this.currentRouteKey$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects)
    );
    systemQuery.owmAppid$.pipe(first()).subscribe((owmAppid) => {
      if (!owmAppid) {
        const storedOwmAppid = storageService.getValue('owmAppid');
        modalService
          .open$(OwmAppidPrompterComponent, storedOwmAppid, { closeOnNavigation: false, disableClose: true, width: '360px' })
          .subscribe((newOwmAppId) => {
            systemService.setOwmAppid(newOwmAppId);
            storageService.setValue('owmAppid', newOwmAppId);
          });
      }
    });
  }
}
