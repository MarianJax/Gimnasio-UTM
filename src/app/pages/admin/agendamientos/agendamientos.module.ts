import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgendamientosRoutingModule } from './agendamientos-routing.module';
import { AgendamientosComponent } from './agendamientos.component';
import { IconModule } from '../../../components/icons/icons.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    AgendamientosComponent
  ],
  imports: [
    CommonModule,
    AgendamientosRoutingModule,
    IconModule,
    BreadcrumbModule,
  ]
})
export class AgendamientosModule { }
