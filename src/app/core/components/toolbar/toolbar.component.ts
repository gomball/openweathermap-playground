import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { APP_CONFIGURATION, AppConfigurationContract } from '../../configuration/app-configuration.contract';
import { SystemService } from '../../state/system/system.service';

@Component({
  selector: 'owm-pg-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  title = '';

  constructor(
    public readonly systemService: SystemService,
    @Inject(APP_CONFIGURATION) appConfiguration: AppConfigurationContract,
  ) {
    this.title = appConfiguration.appName;
  }
}
