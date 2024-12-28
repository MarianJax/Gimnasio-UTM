import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'entrenamiento',
        loadChildren: () => import('./entrenamiento/entrenamiento.module').then(m => m.EntrenamientoModule)
      }
    ]
  },
  {
    path: 'agendamiento',
    loadChildren: () => import('../agendamiento/agendamiento.module').then(m => m.AgendamientoModule)
  },
  {
    path: 'membresia',
    loadChildren: () => import('../membresia/membresia.module').then(m => m.MembresiaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
