import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutinasRoutingModule } from './rutinas-routing.module';
import { RutinasComponent } from './rutinas.component';


@NgModule({
  declarations: [
    RutinasComponent
  ],
  imports: [
    CommonModule,
    RutinasRoutingModule
  ]
})
export class RutinasModule { }
