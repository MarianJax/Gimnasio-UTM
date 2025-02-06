import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { IconModule } from 'src/app/components/icons/icons.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { RegistrosComponent } from './registros/registros.component';


@NgModule({
  declarations: [
    EquiposComponent,
    RegistrosComponent
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    IconModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule
  ]
})
export class EquiposModule { }
