import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { APP_CONFIGURATION, AppConfigurationContract } from '../../configuration/app-configuration.contract';

@Component({
  selector: 'owm-pg-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  title = '';

  constructor(@Inject(APP_CONFIGURATION) appConfiguration: AppConfigurationContract) {
    this.title = appConfiguration.appName;
  }

  setTheme(theme: 'light' | 'dark'): void {}
}
