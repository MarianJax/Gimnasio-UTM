import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { CreateFormHorarioComponent } from 'src/app/components/horario/create-form-horario/create-form-horario.component';
import { TableHorariosComponent } from 'src/app/components/horario/table-horarios/table-horarios.component';
import { CreateHorarioEntrenadorComponent } from 'src/app/components/horario_entrenador/create-horario-entrenador/create-horario-entrenador.component';
import { TableHorarioEntrenadorComponent } from 'src/app/components/horario_entrenador/table-horario-entrenador/table-horario-entrenador.component';
import { IconModule } from 'src/app/components/icons/icons.module';
import { HorariosRoutingModule } from './horarios-routing.module';
import { HorariosComponent } from './horarios.component';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';

@NgModule({
  declarations: [HorariosComponent, CreateFormHorarioComponent, TableHorariosComponent, CreateHorarioEntrenadorComponent, TableHorarioEntrenadorComponent],
  imports: [
    CommonModule,
    SortIconModule,
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
    InputTextModule,
    DialogModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class HorariosModule { }
