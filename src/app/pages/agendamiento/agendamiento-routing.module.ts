import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamientoComponent } from './agendamiento.component';
import { RegistroComponent } from '../membresia/registro/registro.component';

const routes: Routes = [
  {
    path: '',

    component: AgendamientoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamientoRoutingModule {}
