import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IconModule } from '../../../../components/icons/icons.module';
import { HistorialComponent } from './historial.component';
import { MaquinaHistorialComponent } from '../../../../components/maquina/maquina-historial/maquina-historial.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SortIconModule } from '../../../../components/sort-icon/sort-icon.module';

@NgModule({
  declarations: [
    HistorialComponent,
    MaquinaHistorialComponent
  ],
  imports: [
    CommonModule,
    SortIconModule,
    HistorialRoutingModule,
    IconModule,
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    TagModule,
    InputTextModule
  ]
})
export class HistorialModule { }
