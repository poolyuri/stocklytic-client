import { Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { GeneralComponent } from './general/components/general.component';

export const routes: Routes = [
  { path: 'general', component: GeneralComponent, data: { animation: 'general' } },
  { path: 'settings', component: SettingsComponent, data: { animation: 'settings' } },
];
