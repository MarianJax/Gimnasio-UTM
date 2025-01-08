import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { AgendamientoComponent } from './agendamiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IconModule } from '../../components/icons/icons.module';
import { DropdownModule } from 'primeng/dropdown';
import { RegistroComponent } from '../membresia/registro/registro.component';
import { RegistroModule } from '../membresia/registro/registro.module';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
// import { IconModule } from "../../components/icons/icons.module";

@NgModule({
  declarations: [
    AgendamientoComponent,
    // RegistroComponent
  ],
  imports: [
    CommonModule,
    AgendamientoRoutingModule,
    ReactiveFormsModule,
    IconModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,

  ],
})
export class AgendamientoModule { }
