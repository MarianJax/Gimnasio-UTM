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
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registros/registros.module').then(m => m.RegistrosModule)
  },
  {
    path: ':id',  // Ruta para subruta :id
    children: [
      {
        path: 'historial',  // Subruta :id/historial
        loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
