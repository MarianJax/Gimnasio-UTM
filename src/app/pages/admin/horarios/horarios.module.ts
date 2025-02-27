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
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TableHorariosComponent } from 'src/app/components/horario/table-horarios/table-horarios.component';
import { InputTextModule } from 'primeng/inputtext';
import { CreateHorarioEntrenadorComponent } from 'src/app/components/horario_entrenador/create-horario-entrenador/create-horario-entrenador.component';
import { TableHorarioEntrenadorComponent } from 'src/app/components/horario_entrenador/table-horario-entrenador/table-horario-entrenador.component';

@NgModule({
  declarations: [HorariosComponent, CreateFormHorarioComponent, TableHorariosComponent, CreateHorarioEntrenadorComponent, TableHorarioEntrenadorComponent],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    BreadcrumbModule,
    TabViewModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    ButtonModule, // esta
    InputTextModule
  ]
})
export class HorariosModule { }
