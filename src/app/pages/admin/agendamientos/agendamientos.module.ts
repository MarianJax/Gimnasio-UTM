import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';
import { IconModule } from '../../../components/icons/icons.module';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';
import { AgendamientosRoutingModule } from './agendamientos-routing.module';
import { AgendamientosComponent } from './agendamientos.component';

@NgModule({
  declarations: [
    AgendamientosComponent
  ],
  imports: [
    CommonModule,
    SortIconModule,
    AgendamientosRoutingModule,
    IconModule,
    BreadcrumbModule,
    ImageModule
  ]
})
export class AgendamientosModule { }
