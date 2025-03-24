import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutinasComponent } from './rutinas.component';

const routes: Routes = [
  {
    path: '',
    component: RutinasComponent
  },
  {
    path: ':id',
    loadChildren: () => import('./rutina-detalle/rutina-detalle.module').then(m => m.RutinaDetalleModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutinasRoutingModule { }
