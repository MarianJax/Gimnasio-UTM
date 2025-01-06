import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembresiaRoutingModule } from './membresia-routing.module';
import { MembresiaComponent } from './membresia.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { IconModule } from 'src/app/components/icons/icons.module';
import { RegistroModule } from './registro/registro.module';


@NgModule({
  declarations: [
    MembresiaComponent
  ],
  imports: [
    CommonModule,
    MembresiaRoutingModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    IconModule,
    RegistroModule,
  ]
})
export class MembresiaModule { }
