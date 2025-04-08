import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
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
import { TableValidacionesComponent } from '../../../components/pagos/validaciones/table-validaciones/table-validaciones.component';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../components/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SortIconModule,
    SharedModule,
    HomeRoutingModule,
    IconModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,

    TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputNumberModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class HomeModule { }
