import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   {
    //     path: ':slug',
    //     loadChildren: () => import('./rutina-detail/rutina-detail.module').then(m => m.RutinaDetailModule)
    //   }
    // ]
  },
  {
    path: 'rutina/:slug',
    loadChildren: () => import('./rutina-detail/rutina-detail.module').then(m => m.RutinaDetailModule)
  },
  {
    path: 'entrenamiento',
    loadChildren: () => import('./entrenamiento/entrenamiento.module').then(m => m.EntrenamientoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
