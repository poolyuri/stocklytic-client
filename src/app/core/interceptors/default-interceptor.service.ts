import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService, MESSAGE_ERROR } from '@shared';

import { TokenData } from '../interfaces/token.interface';
import { TokenService } from '../auth/services/token.service';

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const notificationService = inject(NotificationService);

  const goToError = (url: string) => {
    setTimeout(() => router.navigateByUrl(url));
  };

  const handleError = (errorResponse: HttpErrorResponse) => {
    switch (errorResponse.status) {
      case 401:
        if (errorResponse instanceof HttpErrorResponse) {
          const { error } = errorResponse;
          const message = error ? error.message : errorResponse.message;

          notificationService.error(message);
          goToError('/401');
        }
        break;
      case 403:
      case 404:
      case 405:
        goToError('/404');
        break;
      case 400:
        if (errorResponse instanceof HttpErrorResponse) {
          const { error } = errorResponse;
          const message = (error ? error.message : errorResponse.message) || MESSAGE_ERROR;

          notificationService.error(message);
        }
        break;
      default:
        if (errorResponse instanceof HttpErrorResponse) {
          notificationService.error('Verifique su conexión a internet.');
          goToError('/500');
        }
        break;
    }
    return throwError(() => errorResponse);
  };

  // Get token and set headers
  const tokenData: TokenData | null = tokenService.get();
  let headers: HttpHeaders;

  if (req.body instanceof FormData) {
    headers = new HttpHeaders({
      Authorization: tokenData?.token || ''
    });
  } else {
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: tokenData?.token || ''
    });
  }

  const reqClone = req.clone({ headers });

  return next(reqClone).pipe(
    catchError(handleError)
  );
};
