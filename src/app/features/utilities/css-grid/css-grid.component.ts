import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { PageHeader } from '@shared';

@Component({
  selector: 'app-css-grid.component',
  imports: [RouterLink, MatCardModule, PageHeader],
  templateUrl: './css-grid.component.html',
  styleUrl: './css-grid.component.scss'
})
export class CssGridComponent {

}
