import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginData } from "./../../interfaces/logindata.interface";
import { TokenData } from "./../../interfaces/token.interface";
import { environment } from './../../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly url: string = `${base_url}/users/login`;

  public login(formData: LoginData): Observable<TokenData> {
    return this.http.post<TokenData>(this.url, formData);
  }
}
