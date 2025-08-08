import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LoginData, LoginService, TokenService, TokenData, StartupService } from '@core';

@Component({
  selector: 'app-login.component',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly startupService = inject(StartupService);
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);

  public isError = true;
  public messageError = '';

  public loginForm = this.formBuilder.group({
    email: [
      'poolyuri@gmail.com',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    ],
    password: ['', [Validators.required]],
  });

  public formMessage(control: any, options: any): string {
    if (control?.errors) {
      if (control.errors['required']) {
        return `${options.name} es requerido`;
      }
      if (control.errors['email']) {
        return `${options.name} debe ser un email válido`;
      }
      if (control.errors['minlength']) {
        return `${options.name} debe tener al menos ${options.minLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        return `${options.name} no puede tener más de ${options.maxLength} caracteres`;
      }
    }
    return '';
  }

  public login(): void {
    const login: LoginData = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };
    this.loginService
      .login(login)
      .pipe(delay(1500))
      .subscribe({
        next: (tokenData: TokenData) => {
          if (tokenData.isSuccess) {
            this.tokenService.set(tokenData);
            this.startupService.load();
            this.router.navigateByUrl('/');
          } else {
            const { isSuccess, message } = tokenData;
            this.isError = isSuccess;
            this.messageError = message;
          }
        },
        error: (error) => {
          this.isError = true;
          this.messageError = error?.error?.message || 'Error de conexión';
        },
      });
  }
}
