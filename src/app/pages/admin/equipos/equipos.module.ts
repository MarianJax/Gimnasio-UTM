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
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { IconModule } from 'src/app/components/icons/icons.module';
import { TableMaquinaComponent } from 'src/app/components/maquina/table-maquina/table-maquina.component';
import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';

@NgModule({
  declarations: [
    EquiposComponent, TableMaquinaComponent
  ],
  imports: [
    CommonModule,
    SortIconModule,
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
    DialogModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class EquiposModule { }
