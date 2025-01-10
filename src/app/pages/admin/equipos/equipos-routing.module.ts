import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './equipos.component';

const routes: Routes = [
  {
    path: '',
    component: EquiposComponent
  },
  {
    path: 'mantenimiento',
    loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
