import { Routes } from '@angular/router';

import { authGuard, authChildGuard, sessionGuard } from '@core';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthLayout } from './theme/auth-layout/auth-layout';
import { AdminLayout } from './theme/admin-layout/admin-layout';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard], // Protege la ruta principal
    canActivateChild: [authChildGuard], // Protege las rutas hijas
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then((m) => m.routes)
      },
      {
        path: 'utilities',
        loadChildren: () =>
          import('./features/utilities/utilities.routes').then((m) => m.routes)
      }
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [sessionGuard] },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
