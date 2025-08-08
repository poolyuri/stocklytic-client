import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { delay, Subscription } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

import { AppSettings, SettingsService, MaterialTheme } from '@core';
import { PageHeader, DisabledControlDirective } from '@shared';

@Component({
  selector: 'app-settings',
  imports: [
    DisabledControlDirective,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    PageHeader,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements AfterViewInit, OnDestroy {
  private readonly settingsService = inject(SettingsService);
  private readonly fb = inject(FormBuilder);
  public settings!: AppSettings;

  public materialThemes: MaterialTheme[] = [];
  private readonly formSubscription = Subscription.EMPTY;
  private options = this.settingsService.options;

  constructor() {
    this.formSubscription = this.form.valueChanges.subscribe(() =>
      this.updateOptions(this.form.getRawValue())
    );
    this.settings = this.settingsService.options;
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.settingsService
      .getMaterialThemes()
      .pipe(delay(1000))
      .subscribe((res) => (this.materialThemes = res));
  }

  public form = this.fb.nonNullable.group<AppSettings>(
    this.settingsService.options
  );

  get isHeaderPosAbove() {
    return this.form.get('headerPos')?.value === 'above';
  }

  get isNavPosTop() {
    return this.form.get('navPos')?.value === 'top';
  }

  get isShowHeader() {
    return this.form.get('showHeader')?.value === true;
  }

  private updateOptions(options: AppSettings) {
    const isDark = options.theme !== 'light';
    this.options = { ...options, isDark };
    this.settingsService.setOptions(this.options);
    this.settingsService.setDirection();
    this.settingsService.setTheme();
  }

  public setMaterialTheme(value: string) {
    this.form.patchValue({ value });
  }
}
