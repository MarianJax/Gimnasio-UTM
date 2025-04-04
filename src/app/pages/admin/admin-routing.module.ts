import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasRolesGuard } from '../../guards/has-roles.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador', 'Entrenador']
        },
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador']
        },
        path: 'equipos',
        loadChildren: () => import('./equipos/equipos.module').then(m => m.EquiposModule)
      },
      {
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador', 'Entrenador']
        },
        path: 'pagos',
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule)
      },
      {
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador', 'Entrenador']
        },
        path: 'rutinas',
        loadChildren: () => import('./rutinas/rutinas.module').then(m => m.RutinasModule)
      },
      {
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador', 'Entrenador']
        },
        path: 'ejercicios',
        loadChildren: () => import('./ejercicios/ejercicios.module').then(m => m.EjerciciosModule)
      },
      {
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador']
        },
        path: 'horarios',
        loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosModule)
      },
      {
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador']
        },
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {

        path: 'agendamientos',
        loadChildren: () => import('./agendamientos/agendamientos.module').then(m => m.AgendamientosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
