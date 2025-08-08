import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TokenData, TokenService } from '@core';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  private readonly tokenService = inject(TokenService);
  private readonly http = inject(HttpClient);

  async transform(img: string, subFolder: 'users' | 'products' | 'logos'): Promise<string> {
    let fullPath: string;
    if (img) {
      if (img.includes('http')) {
        fullPath = img;
      } else if (img.includes('default')) {
        fullPath = `assets/images/${subFolder}/default.jpg`;  
      } else {
        fullPath = `${base_url}/uploads/${subFolder}/${img}`;
      }
    }
    else {
      fullPath = `assets/images/${subFolder}/default.jpg`;
    }

    const tokenData: TokenData = this.tokenService.get();
    const headers = new HttpHeaders({
        'Authorization': tokenData.token
    });
    
    try {
      const imageBlob = await firstValueFrom(this.http.get(fullPath, { headers, responseType: 'blob' }));
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageBlob);
      });
    } catch {
      return `assets/images/${subFolder}/default.jpg`;
    }
  }

}
