import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './guards/auth.guard';
import { RutinasComponent } from './demo/components/home/rutinas/rutinas.component';
import { MaquinasComponent } from './demo/components/inventario/maquinas/maquinas.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'login', component: LoginComponent },
  {path: 'rutinas',component: RutinasComponent},
  {path: 'inventario', component: MaquinasComponent},
    { 
    path: '',
    component: AppLayoutComponent,
    children: [
        {
            path: '',
            redirectTo: '/rutinas',
            pathMatch: 'full'
        },
      //{ path: 'rutinas', loadChildren: ()=> import ('./demo/components/home/home.module').then(m => m.HomeModule)  },
        { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
        { path: 'inventario', loadChildren: () => import('./demo/components/inventario/inventario.module').then(m => m.InventarioModule) }
    ]
},

  {
    path: 'auth',
    loadChildren: () =>
      import('./demo/components/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
