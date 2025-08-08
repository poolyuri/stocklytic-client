import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Menu } from '../models/menu.model';
import { MenuRole } from '../models/menu-role.model';
import { TokenService } from '@core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MenuRoleService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private get idCompany(): number {
    return this.tokenService.get().idCompany;
  }

  public getMenuByUser(idCompany: number, idUser: number) {
    return this.http
      .get<{ isSuccess: boolean; listEntity: Menu[] }>(
        `${base_url}/menuroles/${idCompany}/getmenubyuser/${idUser}`
      )
      .pipe(map((res) => res));
  }

  public getMenuByRole(idRole: number) {
    return this.http
      .get<{ isSuccess: boolean; listEntity: MenuRole[] }>(
        `${base_url}/menuroles/${this.idCompany}/getmenubyrole/${idRole}`
      )
      .pipe(map((res) => res));
  }

  public upSert(menuRoles: MenuRole[]) {
    return this.http.post(`${base_url}/menuroles`, { menuRoles: menuRoles });
  }
}
