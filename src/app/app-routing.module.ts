import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { InventarioModule } from './inventario/inventario.module';
import { ApiService } from './services/api.service';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioModule } from './usuario/usuario.module';
import { CoreModule } from './core/core.module';
import { AdmiModule } from './admi/admi.component.module';
import { AuthModule } from './auth/auth.module';
import { NotfoundComponent } from './component/notfound/notfound.component';



const routes: Routes = [
  
    { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

          
  {
    path: 'Inicio',
    loadChildren: () => import('./agendamiento/agendamiento.module').then(m => m.AgendamientoModule),
    canActivate: [false]
  },
  {
    path: 'Entrenamiento',
    loadChildren: () => import('./agendamiento/agendamiento.module').then(m => m.AgendamientoModule),
  },
  {
    path: 'Agendamiento',
    loadChildren: () => import('./inventario/inventario.module').then(m => m.InventarioModule),
  },
  {
    path: 'Membresia',
    loadChildren: () => import('./agendamiento/agendamiento.module').then(m => m.AgendamientoModule),
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'Login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }