import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { IconModule } from "../../../components/icons/icons.module";


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    RegistroRoutingModule,
    FormsModule,
    DropdownModule,
    TableModule,
    CommonModule,
    IconModule
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroModule { }
