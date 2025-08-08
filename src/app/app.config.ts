import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_CARD_CONFIG } from '@angular/material/card';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { appState, effectsProviders } from './app.state';
import { StartupService, defaultInterceptor } from '@core';
import {
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/es';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => inject(StartupService).load()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // HTTP Client con fetch API moderna
      withInterceptors([defaultInterceptor]) // Registrar el interceptor funcional
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    // redux store and effects
    provideStore(appState),
    provideEffects(effectsProviders),
    // Provide the default Material Card configuration
    {
      provide: MAT_CARD_CONFIG,
      useValue: {
        appearance: 'outlined',
      },
    },
    // Configuración de DatePicker con Moment y español
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => 'es-ES',
    },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: false }
    },
    provideMomentDateAdapter({
      parse: {
        dateInput: 'l',
      },
      display: {
        dateInput: 'l',
        dateA11yLabel: 'LL',
        monthYearLabel: 'DD MMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
        monthLabel: 'DD',
      },
    })
  ],
};
