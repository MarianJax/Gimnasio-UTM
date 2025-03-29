import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IconModule } from 'src/app/components/icons/icons.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HomeComponent } from './home.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableAgendamientosComponent } from '../../../components/agendamientos/table-agendamientos/table-agendamientos.component';
import { DialogModule } from 'primeng/dialog';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    HomeComponent,
    TableAgendamientosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IconModule,
    TableModule, 
    FormsModule,
    ReactiveFormsModule,

    TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputNumberModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class HomeModule { }
