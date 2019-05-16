import { AppConfigurationContract } from '../app/core/configuration/app-configuration.contract';

export const environment: AppConfigurationContract = {
  production: true,
  appName: 'openweathermap.org playground',
  owmApiRoot: 'https://api.openweathermap.org/data',
  owmApiKey: '__temp_not_valid_key__',
  defaultLocale: 'es'
};
