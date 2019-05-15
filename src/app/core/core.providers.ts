import { APP_INITIALIZER, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const appInitializerFnFactory = (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer): (() => Promise<any>) => () =>
  new Promise((resolve, reject) => {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
    resolve();
  });

export const APP_INITIALIZER_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFnFactory,
    deps: [MatIconRegistry, DomSanitizer],
    multi: true
  }
];
