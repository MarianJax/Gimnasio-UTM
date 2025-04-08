import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { AsistenciaComponent } from './asistencia.component';
import { IconModule } from '../../../../components/icons/icons.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TableAgendamientosComponent } from '../../../../components/agendamientos/table-agendamientos/table-agendamientos.component';


@NgModule({
  declarations: [
    AsistenciaComponent,
    TableAgendamientosComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    BreadcrumbModule,
    AsistenciaRoutingModule,

    IconModule,
    ReactiveFormsModule,
    TableModule,
    RippleModule,
    ButtonModule,
    ToastModule, 
    DialogModule,
    InputTextModule,
    TagModule
  ]
})
export class AsistenciaModule { }
