import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { TokenService } from '../services/token.service';

function checkSession(currentUrl?: string): boolean {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const token = tokenService.get();
  const hasValidSession = !!token?.token;
  
  if (hasValidSession && currentUrl?.includes('/auth')) {
    // If user has valid session and is trying to access auth routes, redirect to home
    router.navigateByUrl('/');
    return false; // Block access to auth routes when authenticated
  }
  
  // Return true if NO valid session (allow access to public routes)
  return !hasValidSession;
}

// Session Guard Function (Angular 20 style)
// This guard allows access only when user is NOT authenticated
export const sessionGuard: CanActivateFn = (route, state) => {
  return checkSession(state.url);
};
