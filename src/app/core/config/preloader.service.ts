import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private readonly document = inject(DOCUMENT);
  private readonly selector = 'globalLoader';

  private getElement() {
    return this.document.querySelector(`#${this.selector}`);
  }

  public hide() {
    const element = this.getElement();
    if (element) {
      element.addEventListener('transitionend', () => {
        element.className = 'global-loader-hidden';
      });

      if (!element.classList.contains('global-loader-hidden')) {
        element.className += ' global-loader-fade-out';
      }
    }
  }
}
