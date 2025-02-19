import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoComponent } from './mantenimiento.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IconModule } from 'src/app/components/icons/icons.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PagoService } from '../../pagos/pago.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EquiposerviceService } from '../service/equiposervice.service';
import { CalendarModule } from 'primeng/calendar';
import { MantenimientoService } from './mantenimiento.service';

@NgModule({
  declarations: [MantenimientoComponent],
  imports: [
    CommonModule,
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
  ],
  providers: [
    MessageService,
    ConfirmationService,
    PagoService,
    EquiposerviceService,
    MantenimientoService
  ],
})
export class MantenimientoModule {}
