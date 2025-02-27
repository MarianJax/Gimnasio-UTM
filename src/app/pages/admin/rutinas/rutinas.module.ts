import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutinasRoutingModule } from './rutinas-routing.module';
import { RutinasComponent } from './rutinas.component';
import { CreateFormRutinaComponent } from 'src/app/components/rutina/create-form-rutina/create-form-rutina.component';
import { TableRutinaComponent } from 'src/app/components/rutina/table-rutina/table-rutina.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { IconModule } from 'src/app/components/icons/icons.module';


@NgModule({
  declarations: [
    RutinasComponent,
    CreateFormRutinaComponent,
    TableRutinaComponent
  ],
  imports: [
    CommonModule,
    RutinasRoutingModule,
    IconModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule, // esta
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TableModule
  ]
})
export class RutinasModule { }
