import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmiRoutingModule } from './admi-routing.module';
import { UserComponent } from './user/user.component';
import { MantenimientoComponent } from './forms/mantenimiento/mantenimiento.component';
import { RegistroComponent } from './forms/registro/registro.component';


@NgModule({
  declarations: [
    UserComponent,
    MantenimientoComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AdmiRoutingModule
  ]
})
export class AdmiModule { }
