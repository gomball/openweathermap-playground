import { InjectionToken } from '@angular/core';

export interface AppConfigurationContract {
  production: boolean;
  appName: string;
  owmApiRoot: string;
  owmApiKey: string;
  defaultLocale: string;
}

export const APP_CONFIGURATION = new InjectionToken<AppConfigurationContract>('APP_CONFIGURATION_TOKEN');
