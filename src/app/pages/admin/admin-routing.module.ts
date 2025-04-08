import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { hasRolesGuard } from '../../guards/has-roles.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        //canActivate: [hasRolesGuard],
        //canLoad: [hasRolesGuard],
       // data: {
        //  expectedRole: ['Administrador', 'Entrenador']
        //},
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'equipos',
        loadChildren: () => import('./equipos/equipos.module').then(m => m.EquiposModule)
      },
      {
        path: 'pagos',
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule)
      },
      {
        path: 'rutinas',
        loadChildren: () => import('./rutinas/rutinas.module').then(m => m.RutinasModule)
      },
      {
        path: 'ejercicios',
        loadChildren: () => import('./ejercicios/ejercicios.module').then(m => m.EjerciciosModule)
      },
      {
        path: 'horarios',
        loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosModule)
      },
      {
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
