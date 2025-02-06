import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';
import { RegistrosComponent } from './registros.component';
import { IconModule } from 'src/app/components/icons/icons.module';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    RegistrosComponent
  ],
  imports: [
    CommonModule,
    RegistrosRoutingModule,
    IconModule,
    TableModule,
    BreadcrumbModule
  ]
})
export class RegistrosModule { }
