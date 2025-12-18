import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { IconModule } from 'src/app/components/icons/icons.module';
import { AgendamientoInfoComponent } from '../../components/agendamientos/create-form/agendamiento-info/agendamiento-info.component';
import { ConfirmComponent } from '../../components/agendamientos/create-form/confirm/confirm.component';
import { CreateFormComponent } from '../../components/agendamientos/create-form/create-form.component';
import { PagoFormComponent } from '../../components/agendamientos/create-form/pago-form/pago-form.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ComprobanteComponent } from 'src/app/components/comprobante/comprobante.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateFormComponent,
    AgendamientoInfoComponent,
    PagoFormComponent,
    ConfirmComponent,
    ComprobanteComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
    DialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService],
})
export class HomeModule {}
