import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { AgendamientoComponent } from './agendamiento.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IconModule } from "../../components/icons/icons.module";
import { DropdownModule } from 'primeng/dropdown';
import { RegistroComponent } from './registro/registro.component';
import { RegistroModule } from './registro/registro.module';


@NgModule({
  declarations: [
    AgendamientoComponent,
    // RegistroComponent
  ],
  imports: [
    CommonModule,
    AgendamientoRoutingModule,
    FormsModule, 
    CalendarModule,
    DropdownModule,
    IconModule,
    RegistroModule
],
})
export class AgendamientoModule { }
