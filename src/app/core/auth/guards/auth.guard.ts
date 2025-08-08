import { inject } from '@angular/core';
import { Router, CanActivateFn, CanActivateChildFn } from '@angular/router';

import { TokenService } from '../services/token.service';

const LOGIN_URL = '/auth/login';

// Helper function to check authentication
function checkAuth(currentUrl?: string): boolean {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  
  const token = tokenService.get();
  const isAuthenticated = !!token?.token;
  
  if (!isAuthenticated) {
    router.navigateByUrl(LOGIN_URL);
  } else if (currentUrl?.includes(LOGIN_URL)) {
    // Si está autenticado y está intentando acceder al login, redirigir a la ruta raíz
    router.navigateByUrl('/');
  }
  
  return isAuthenticated;
}

// Auth Guard Function (Angular 20 style)
export const authGuard: CanActivateFn = (route, state) => {
  return checkAuth(state.url);
};

// Auth Guard for Child Routes
export const authChildGuard: CanActivateChildFn = (route, state) => {
  return checkAuth(state.url);
};
