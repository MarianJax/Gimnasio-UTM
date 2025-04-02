import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { IconModule } from '../../../../components/icons/icons.module';
import { CreateRolesComponent } from '../../../../components/roles/create-roles/create-roles.component';
import { TableRolesComponent } from '../../../../components/roles/table-roles/table-roles.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SortIconModule } from '../../../../components/sort-icon/sort-icon.module';

@NgModule({
  declarations: [
    RolesComponent,
    CreateRolesComponent,
    TableRolesComponent,
  ],
  imports: [
    CommonModule,
    SortIconModule,
    RolesRoutingModule,
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
  providers: [ConfirmationService, MessageService]
})
export class RolesModule { }
