import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from '../../../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly http: HttpClient = inject(HttpClient);

  private get headers(): HttpHeaders {
    return new HttpHeaders({
			'Content-Type': 'application/json'
    });
  }

  upload(formData: FormData) {
    return this.http.post(`${base_url}/uploads`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  remove(formData: FormData) {
    const options = { headers: this.headers, body: formData };
    return this.http.delete(`${base_url}/uploads`, options);
  }
}
