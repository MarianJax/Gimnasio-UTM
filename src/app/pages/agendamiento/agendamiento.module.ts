import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { AgendamientoComponent } from './agendamiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../../components/icons/icons.module';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';


import { AgendamientoInfoComponent } from 'src/app/components/agendamientos/create-form/agendamiento-info/agendamiento-info.component';
import { StepsModule } from 'primeng/steps';
import { CreateFormComponent } from 'src/app/components/agendamientos/create-form/create-form.component';
import { PagoFormComponent } from 'src/app/components/agendamientos/create-form/pago-form/pago-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmComponent } from '../../components/agendamientos/create-form/confirm/confirm.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  declarations: [
    AgendamientoComponent,
    CreateFormComponent,
    AgendamientoInfoComponent,
    PagoFormComponent,
    ConfirmComponent
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
    StepsModule,
    TabViewModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    ToastModule,
    TimelineModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class AgendamientoModule { }
