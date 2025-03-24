import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconModule } from 'src/app/components/icons/icons.module';
import { EjerciciosRoutingModule } from './ejercicios-routing.module';
import { EjerciciosComponent } from './ejercicios.component';
import { CreateFormEjercicioComponent } from '../../../components/ejercicios/create-form-ejercicio/create-form-ejercicio.component';
import { TableEjerciciosComponent } from '../../../components/ejercicios/table-ejercicios/table-ejercicios.component';


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
    MultiSelectModule,
    MenuModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class EjerciciosModule { }
