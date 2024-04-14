import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {importProvidersFrom} from '@angular/core';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(MatNativeDateModule),
    { provide: MAT_DATE_LOCALE, useValue: 'HE-IL' }
  ]
};
