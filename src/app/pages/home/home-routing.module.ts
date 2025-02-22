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
    path: ':slug',
    loadChildren: () => import('./rutina-detail/rutina-detail.module').then(m => m.RutinaDetailModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
