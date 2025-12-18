import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconModule } from '../../../components/icons/icons.module';
import { FormComponent } from '../../../components/rutina/form/form.component';
import { FormComponent as FormGrupo } from '../../../components/grupo-muscular/form/form.component';
import { TableComponent } from '../../../components/rutina/table/table.component';
import { TableComponent as TableGroup } from '../../../components/grupo-muscular/table/table.component';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';
import { RutinaRoutingModule } from './rutina-routing.module';
import { RutinaComponent } from './rutina.component';

@NgModule({
  declarations: [RutinaComponent, FormComponent, TableComponent, FormGrupo, TableGroup],
  imports: [
    CommonModule,
    SortIconModule,
    IconModule,
    ToastModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule,
    RutinaRoutingModule,
  ],
  providers: [MessageService],
})
export class RutinaModule {}
