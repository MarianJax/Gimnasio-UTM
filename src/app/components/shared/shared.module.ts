import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TableValidacionesComponent } from '../pagos/validaciones/table-validaciones/table-validaciones.component';
import { ToastModule } from 'primeng/toast';
import { IconModule } from '../icons/icons.module';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [TableValidacionesComponent],
  imports: [
    CommonModule,
    IconModule,
    ReactiveFormsModule,
    TableModule,
    RippleModule,
    ButtonModule,
    ToastModule, 
    DialogModule,
    InputTextModule,
    TagModule
  ],
  exports: [TableValidacionesComponent],
  providers: [MessageService, ConfirmationService],
})
export class SharedModule { }
