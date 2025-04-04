import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';
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
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IconModule } from 'src/app/components/icons/icons.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TablePagosComponent } from '../../../components/pagos/table-pagos/table-pagos.component';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';

@NgModule({
  declarations: [
    PagosComponent,
    TablePagosComponent
  ],
  imports: [
    CommonModule,
    SortIconModule,
    PagosRoutingModule,
    IconModule,
    TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, BreadcrumbModule
  ],
  providers: [MessageService, ConfirmationService], 
})
export class PagosModule { }
