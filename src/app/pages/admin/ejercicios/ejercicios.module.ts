import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjerciciosRoutingModule } from './ejercicios-routing.module';
import { EjerciciosComponent } from './ejercicios.component';
import { IconModule } from 'src/app/components/icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    EjerciciosComponent
  ],
  imports: [
    CommonModule,
    EjerciciosRoutingModule,
        IconModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
        AutoCompleteModule
  ]
})
export class EjerciciosModule { }
