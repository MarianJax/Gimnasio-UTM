import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { IconModule } from '../../components/icons/icons.module';
import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { AgendamientoComponent } from './agendamiento.component';


import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { AgendamientoInfoComponent } from 'src/app/components/agendamientos/create-form/agendamiento-info/agendamiento-info.component';
import { CreateFormComponent } from 'src/app/components/agendamientos/create-form/create-form.component';
import { PagoFormComponent } from 'src/app/components/agendamientos/create-form/pago-form/pago-form.component';
import { ConfirmComponent } from '../../components/agendamientos/create-form/confirm/confirm.component';

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
    DialogModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class AgendamientoModule { }
