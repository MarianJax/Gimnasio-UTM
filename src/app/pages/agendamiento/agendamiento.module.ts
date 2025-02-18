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

import { CreateComponent } from 'src/app/components/agendamientos/create/create.component';

@NgModule({
  declarations: [
    AgendamientoComponent,
    CreateComponent,
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

    TabViewModule,
  ],
})
export class AgendamientoModule {}
