import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { environment } from "./../../../../../environments/environment";
import { Grouper } from '../models/grouper.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GrouperService {
  private readonly http: HttpClient = inject(HttpClient);

  getAll() {
    return this.http.get<{ listEntity: Grouper[] }>(`${base_url}/GrouperDetails/select`)
      .pipe(
        map((res) => res)
      );
  }

}
