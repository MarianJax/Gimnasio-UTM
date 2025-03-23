import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjerciciosRoutingModule } from './ejercicios-routing.module';
import { EjerciciosComponent } from './ejercicios.component';
import { CreateFormEjercicioComponent } from 'src/app/components/ejercicios/create-form-ejercicio/create-form-ejercicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IconModule } from 'src/app/components/icons/icons.module';
import { TableEjerciciosComponent } from 'src/app/components/ejercicios/table-ejercicios/table-ejercicios.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    EjerciciosComponent,
    CreateFormEjercicioComponent,
    TableEjerciciosComponent
  ],
  imports: [
    CommonModule,
    EjerciciosRoutingModule,
    IconModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule, // esta
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TableModule,
    DialogModule,
    RippleModule,
    ConfirmDialogModule,
    ToastModule,
    MultiSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class EjerciciosModule { }
