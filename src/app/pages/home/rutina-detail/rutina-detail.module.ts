import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutinaDetailRoutingModule } from './rutina-detail-routing.module';
import { RutinaDetailComponent } from './rutina-detail.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    RutinaDetailComponent
  ],
  imports: [
    CommonModule,
    RutinaDetailRoutingModule,
    ButtonModule,
    RippleModule
  ]
})
export class RutinaDetailModule { }
