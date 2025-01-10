import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'entrenamientos',
        loadChildren: () => import('./rutinas/rutinas.module').then(m => m.RutinasModule)
      },
      {
        path: 'equipos',
        loadChildren: () => import('./equipos/equipos.module').then(m => m.EquiposModule)
      },
      {
        path: 'ejercicios',
        loadChildren: () => import('./ejercicios/ejercicios.module').then(m => m.EjerciciosModule)
      },
      {
        path: 'pagos',
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
