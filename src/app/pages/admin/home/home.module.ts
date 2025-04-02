import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
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
import { TableAgendamientosComponent } from '../../../components/agendamientos/table-agendamientos/table-agendamientos.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AdminModule } from '../admin.module';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';


@NgModule({
  declarations: [
    HomeComponent,
    TableAgendamientosComponent
  ],
  imports: [
    CommonModule,
    SortIconModule,
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
