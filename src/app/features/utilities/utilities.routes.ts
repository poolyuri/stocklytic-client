import { Routes } from "@angular/router";
import { CssGridComponent } from "./css-grid/css-grid.component";
import { CssHelperComponent } from "./css-helper/css-helper.component";

export const routes: Routes = [
  { path: 'css-grid', component: CssGridComponent, data: { animation: 'css-grid' } },
  { path: 'css-helper', component: CssHelperComponent, data: { animation: 'css-helper' } }
];
