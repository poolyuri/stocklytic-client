import { DOCUMENT, inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Direction } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings, AppTheme, defaults } from './../interfaces/settings.interface';
import { MaterialTheme } from './../interfaces/material-theme.interface';
import { StorageService } from './storage.service';
import { AppDirectionality } from './directionality.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public readonly settings = defaults;
  public readonly key = 'theme';
  private readonly document = inject(DOCUMENT);
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private readonly store = inject(StorageService);
  private readonly mediaMatcher = inject(MediaMatcher);
  private readonly dir = inject(AppDirectionality);
  private readonly http = inject(HttpClient);

  private readonly notify$ = new BehaviorSubject<Partial<AppSettings>>({});

  get notify() {
    return this.notify$.asObservable();
  }

  private readonly htmlElement = this.document.querySelector('html')!;

  private readonly storedOptions: AppSettings = this.store.get(this.key);

  options: AppSettings = Object.assign(defaults, this.storedOptions);

  constructor() {
    const settings = localStorage.getItem(this.key);

    if (settings) {
      this.settings = JSON.parse(settings);
    }
  }

  public reset() {
    this.store.remove(this.key);
  }

  public setOptions(options?: Partial<AppSettings>) {
    this.options = Object.assign(defaults, this.options, options);
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  public setDirection(dir?: Direction) {
    if (dir) {
      this.setOptions({ dir });
    }
    this.dir.value = this.options.dir ?? 'ltr';
    this.htmlElement.dir = this.options.dir ?? 'ltr';
  }

  private getThemeColor() {
    if (
      this.options.theme === 'auto' &&
      this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      return isSystemDark ? 'dark' : 'light';
    } else {
      return this.options.theme as Exclude<AppTheme, 'auto'>;
    }
  }

   public setTheme(theme?: AppTheme) {
    if (theme) {
      this.setOptions({ theme });
    }
    const { value } = this.options;
    const themeColor = this.getThemeColor();
    if (themeColor === 'light') {
      this.setMaterialTheme(value.replace('-light', ''));
    } else {
      this.setMaterialTheme(value.replace('-dark', ''));
    }
  }

  // Métodos para obtener información actual del DOM
  public getCurrentThemeClasses(): string[] {
    return Array.from(this.htmlElement.classList).filter(className => 
      className.endsWith('-light') || className.endsWith('-dark')
    );
  }

  public getMaterialThemes() {
    return this.http.get<MaterialTheme[]>('assets/json/material-theme.json')
      .pipe(
        map(res => res)
      );
  }

  public setMaterialTheme(newValue: string) {
    const { isDark, value } = this.options;
    const currentTheme: string = this.getCurrentThemeClasses()[0] || (isDark ? `${value}-dark` : `${value}-light`);
    const newTheme: string = isDark ? `${newValue}-dark` : `${newValue}-light`;
    
    this.renderer.removeClass(document.documentElement, currentTheme);
    this.renderer.addClass(document.documentElement, newTheme);
  }
}
