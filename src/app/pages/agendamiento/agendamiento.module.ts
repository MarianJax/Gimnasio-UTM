import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { AgendamientoComponent } from './agendamiento.component';


@NgModule({
  declarations: [
    AgendamientoComponent
  ],
  imports: [
    CommonModule,
    AgendamientoRoutingModule
  ]
})
export class AgendamientoModule { }
