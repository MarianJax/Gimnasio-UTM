import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamientosComponent } from './agendamientos.component';

const routes: Routes = [
  {
    path: '',
    component: AgendamientosComponent
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamientosRoutingModule { }
