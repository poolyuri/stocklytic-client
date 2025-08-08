import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-branding-widget',
  template: `
    <a class="branding" routerLink="/">
      <img
        src="assets/images/prodhub_logo.png"
        class="branding-logo"
        alt="logo"
      />
      @if (showName) {
        <span class="branding-name">Stocklytic</span>
      }
    </a>
  `,
  styles: `
    .branding {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
      border-radius: 50rem;
    }

    .branding-logo {
      width: 2rem;
      height: 2rem;
      border-radius: 50rem;
    }

    .branding-name {
      margin: 0 0.5rem;
      font-size: 1rem;
      font-weight: 500;
    }
  `,
})
export class BrandingWidget {
  @Input() showName = true;
}
