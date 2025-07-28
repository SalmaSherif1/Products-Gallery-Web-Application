// import {
//   ApplicationConfig,
//   importProvidersFrom,
//   provideZoneChangeDetection,
// } from '@angular/core';
// import {
//   provideRouter,
//   withHashLocation,
//   withInMemoryScrolling,
//   withViewTransitions,
// } from '@angular/router';
// import {
//   provideHttpClient,
//   withFetch,
//   withInterceptors,
// } from '@angular/common/http';

// import { routes } from './app.routes';
// import {
//   provideClientHydration,
//   withEventReplay,
// } from '@angular/platform-browser';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(
//       routes,
//       withInMemoryScrolling({
//         scrollPositionRestoration: 'enabled',
//       }),
//       withViewTransitions(),
//       withHashLocation()
//     ),
//     provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
//     provideClientHydration(withEventReplay()),
//     importProvidersFrom(NgxSpinnerModule),
//   ],
// };
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Add this line

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
      withViewTransitions(),
      withHashLocation()
    ),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(NgxSpinnerModule),
    provideAnimations(), // ✅ Enable Angular animations
  ],
};
