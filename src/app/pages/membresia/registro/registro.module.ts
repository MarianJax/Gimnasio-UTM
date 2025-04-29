import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { IconModule } from '../../../components/icons/icons.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    IconModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ToastModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroModule {}
