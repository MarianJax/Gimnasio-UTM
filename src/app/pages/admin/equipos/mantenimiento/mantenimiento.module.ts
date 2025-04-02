import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { IconModule } from 'src/app/components/icons/icons.module';
import { EquiposService } from '../../../../service/equipo/equipo.service';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoComponent } from './mantenimiento.component';
import { CreateMantenimientoComponent } from '../../../../components/mantenimientos/create-mantenimiento/create-mantenimiento.component';
import { TableMantenimientoComponent } from '../../../../components/mantenimientos/table-mantenimiento/table-mantenimiento.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { MantenimientosService } from '../../../../service/mantenimiento/mantenimientos.service';
import { SortIconModule } from '../../../../components/sort-icon/sort-icon.module';

@NgModule({
  declarations: [MantenimientoComponent, CreateMantenimientoComponent, TableMantenimientoComponent],
  imports: [
    CommonModule,
    SortIconModule,
    MantenimientoRoutingModule,
    IconModule,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    CalendarModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    BreadcrumbModule,
    AutoCompleteModule,    
    MultiSelectModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    EquiposService,
    MantenimientosService
  ],
})
export class MantenimientoModule { }
