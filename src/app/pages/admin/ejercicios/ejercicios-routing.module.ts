import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjerciciosComponent } from './ejercicios.component';

const routes: Routes = [
  {
    path: '',
    component: EjerciciosComponent,
    children: [
      {
        path: 'historial',
        loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule)
      },
      {
        path: 'mantenimiento',
        loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjerciciosRoutingModule { }
