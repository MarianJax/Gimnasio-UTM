import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconModule } from '../../../components/icons/icons.module';
import { CreateTarifasComponent } from '../../../components/tarifas/create-tarifas/create-tarifas.component';
import { TableTarifasComponent } from '../../../components/tarifas/table-tarifas/table-tarifas.component';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';
import { TarifasRoutingModule } from './tarifas-routing.module';
import { TarifasComponent } from './tarifas.component';

@NgModule({
  declarations: [TarifasComponent, CreateTarifasComponent, TableTarifasComponent],
  imports: [
    CommonModule,
    SortIconModule,
    TarifasRoutingModule,
    IconModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    ButtonModule, // esta
    InputTextModule,
    DropdownModule,
    TableModule,
    DialogModule,
    RippleModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, MessageService],
})
export class TarifasModule {}
