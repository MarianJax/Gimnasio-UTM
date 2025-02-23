import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { AgendamientoComponent } from './agendamiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../../components/icons/icons.module';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';


import { PagoComponent } from 'src/app/components/agendamientos/create-form/pago/pago.component';
import { AgendamientoInfoComponent } from 'src/app/components/agendamientos/create-form/agendamiento-info/agendamiento-info.component';
import { StepsModule } from 'primeng/steps';
import { CreateFormComponent } from 'src/app/components/agendamientos/create-form/create-form.component';

@NgModule({
  declarations: [
    AgendamientoComponent,
    CreateFormComponent,
    AgendamientoInfoComponent,
    PagoComponent,
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
  ],
})
export class AgendamientoModule {}
