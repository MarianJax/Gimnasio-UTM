import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';
import { TimelineModule } from 'primeng/timeline';

import { IconModule } from '../../../components/icons/icons.module';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';
import { AgendamientosRoutingModule } from './agendamientos-routing.module';
import { AgendamientosComponent } from './agendamientos.component';
import { SharedModule } from '../../../components/shared/shared.module';

@NgModule({
  declarations: [
    AgendamientosComponent,
  ],
  imports: [
    CommonModule,
    SortIconModule,
    SharedModule,
    AgendamientosRoutingModule,
    IconModule,
    BreadcrumbModule,
    TimelineModule,
    ImageModule
  ]
})
export class AgendamientosModule { }
