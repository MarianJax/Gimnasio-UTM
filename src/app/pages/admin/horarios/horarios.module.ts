import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { IconModule } from 'src/app/components/icons/icons.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HorariosComponent } from './horarios.component';
import { TabViewModule } from 'primeng/tabview';
import { CreateFormHorarioComponent } from 'src/app/components/horario/create-form-horario/create-form-horario.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [HorariosComponent, CreateFormHorarioComponent],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    BreadcrumbModule,
    TabViewModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class HorariosModule { }
