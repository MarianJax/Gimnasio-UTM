import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { IconModule } from 'src/app/components/icons/icons.module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IconModule,
    ButtonModule,
    RippleModule
  ]
})
export class AdminModule { }
