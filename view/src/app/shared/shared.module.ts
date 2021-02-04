import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule, RouterModule,

    MatToolbarModule, MatTooltipModule, MatIconModule,
    MatMenuModule, MatButtonModule, MatDividerModule,
  ],
  exports: [NavigationBarComponent]
})
export class SharedModule { }
