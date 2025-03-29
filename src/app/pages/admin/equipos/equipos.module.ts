import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { IconModule } from 'src/app/components/icons/icons.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { TableMaquinaComponent } from 'src/app/components/maquina/table-maquina/table-maquina.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    EquiposComponent, TableMaquinaComponent
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    IconModule,
    BreadcrumbModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    ToolbarModule,
    FileUploadModule, TagModule, 
    ConfirmDialogModule,
    DialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class EquiposModule { }
