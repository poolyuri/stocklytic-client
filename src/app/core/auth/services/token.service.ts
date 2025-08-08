import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { TokenData } from '../../interfaces/token.interface';
import { StorageService } from '../../config/storage.service';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly storage = inject(StorageService);
  private readonly change$ = new BehaviorSubject<TokenData | null>(this.getInitialToken());

  private getInitialToken(): TokenData | null {
    try {
      const data = this.storage.get(TOKEN_KEY);
      return (data as TokenData) || null;
    } catch {
      return null;
    }
  }

  public set(data: TokenData): boolean {
    this.change$.next(data);
    return this.storage.set(TOKEN_KEY, data);
  }

  public get(): TokenData {
    const data = this.storage.get(TOKEN_KEY);
    return (data as TokenData) || null;
  }

  public isValid(): boolean {
    const token = this.get();
    return Object.values(token).some(v => v !== undefined);
  }

  public clear(): void {
    this.storage.remove(TOKEN_KEY);
    this.change$.next(null);
  }

  public change(): Observable<TokenData | null> {
    return this.change$.pipe(share());
  }
}
