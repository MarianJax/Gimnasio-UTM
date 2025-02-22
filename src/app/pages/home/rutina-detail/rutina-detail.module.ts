import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutinaDetailRoutingModule } from './rutina-detail-routing.module';
import { RutinaDetailComponent } from './rutina-detail.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { IconModule } from 'src/app/components/icons/icons.module';


@NgModule({
  declarations: [
    RutinaDetailComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    RutinaDetailRoutingModule,
    ButtonModule,
    RippleModule,
    DropdownModule
  ]
})
export class RutinaDetailModule { }
