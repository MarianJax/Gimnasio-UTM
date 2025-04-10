import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { IconModule } from '../../../../components/icons/icons.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ChartModule } from 'primeng/chart';
import { ReportesComponent } from './reportes.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,

    IconModule,
    BreadcrumbModule,
    ChartModule,

    FormsModule,
    DropdownModule
  ]
})
export class ReportesModule { }
