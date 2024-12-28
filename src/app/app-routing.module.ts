import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './pages/auth/login/login.module';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) }
    ]
  },
  {
    path: '',
    component: TopBarComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
