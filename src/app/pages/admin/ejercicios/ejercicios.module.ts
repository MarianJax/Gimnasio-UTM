import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjerciciosRoutingModule } from './ejercicios-routing.module';
import { EjerciciosComponent } from './ejercicios.component';


@NgModule({
  declarations: [
    EjerciciosComponent
  ],
  imports: [
    CommonModule,
    EjerciciosRoutingModule
  ]
})
export class EjerciciosModule { }
