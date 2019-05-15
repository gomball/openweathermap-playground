import { InjectionToken } from '@angular/core';

export interface AppConfigurationContract {
  appName: string;
  owmApiRoot: string;
  defaultLocale: string;
}

export const APP_CONFIGURATION = new InjectionToken<AppConfigurationContract>('APP_CONFIGURATION_TOKEN');
