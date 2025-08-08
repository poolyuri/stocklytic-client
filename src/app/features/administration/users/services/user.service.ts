import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { ResponseData, TokenService } from '@core';

import { User, IUser } from '../models/user.model';
import { environment } from './../../../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private get idCompany(): number {
    return this.tokenService.get().idCompany;
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
			'Content-Type': 'application/json'
    });
  }

  getAll() {
    return this.http.get<{ listEntity: User[] }>(`${base_url}/users/${this.idCompany}`)
      .pipe(
        map(res => res)
      );
  }

  getById(guidUser: string) {
    return this.http.get<{ entity: User }>(`${base_url}/users/${this.idCompany}/${guidUser}`);
  }

  create(user: User) {
    return this.http.post<{ response: ResponseData }>(`${base_url}/users`, user);
  }

  update(user: User) {
    return this.http.put<ResponseData>(`${base_url}/users`, user);
  }

  delete(user: IUser) {
    const options = { headers: this.headers, body: user };

    return this.http.delete<{ response: ResponseData }>(`${base_url}/users`, options);
  }
}
