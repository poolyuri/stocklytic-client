import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PreloaderService } from './core/config/preloader.service';
import { SettingsService } from './core/config/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class App implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);

  ngOnInit() {
    console.log('%cSOLARIUM SOFTWARE CORPORATION INC.', 'color: #3c9;font-size:18px;font-weight:bold;');
    
    this.settings.setTheme();
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
