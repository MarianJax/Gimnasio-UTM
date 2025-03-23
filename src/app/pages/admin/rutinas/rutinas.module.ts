import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutinasRoutingModule } from './rutinas-routing.module';
import { RutinasComponent } from './rutinas.component';
import { CreateFormRutinaComponent } from 'src/app/components/rutina/create-form-rutina/create-form-rutina.component';
import { TableRutinaComponent } from 'src/app/components/rutina/table-rutina/table-rutina.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { IconModule } from 'src/app/components/icons/icons.module';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    RutinasComponent,
    CreateFormRutinaComponent,
    TableRutinaComponent
  ],
  imports: [
    CommonModule,
    RutinasRoutingModule,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class RutinasModule { }
