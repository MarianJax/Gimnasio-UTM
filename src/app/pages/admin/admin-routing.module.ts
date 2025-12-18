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
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['ADMINISTRADOR GYM', 'ENTRENADOR']
        },
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
        path: 'horarios',
        loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosModule)
      },
      {
        path: 'rutinas',
        loadChildren: () => import('./rutina/rutina.module').then(m => m.RutinaModule)
      },
      {
        path: 'tarifas',
        loadChildren: () => import('./tarifas/tarifas.module').then(m => m.TarifasModule)
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
