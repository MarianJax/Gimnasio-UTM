import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { AsistenciaComponent } from './asistencia.component';
import { IconModule } from '../../../../components/icons/icons.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    AsistenciaComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    BreadcrumbModule,
    AsistenciaRoutingModule
  ]
})
export class AsistenciaModule { }
