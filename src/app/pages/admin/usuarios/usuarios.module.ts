import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { IconModule } from '../../../components/icons/icons.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { CreateFormUsuarioComponent } from '../../../components/usuario/create-form-usuario/create-form-usuario.component';
import { TableUsuarioComponent } from '../../../components/usuario/table-usuario/table-usuario.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { RolesComponent } from './roles/roles.component';
import { SortIconModule } from '../../../components/sort-icon/sort-icon.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    CreateFormUsuarioComponent,
    TableUsuarioComponent
  ],
  imports: [
    CommonModule,
    SortIconModule,
    UsuariosRoutingModule,
    IconModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule, // esta
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TableModule,
    DialogModule,
    RippleModule,
    MultiSelectModule
  ]
})
export class UsuariosModule { }
