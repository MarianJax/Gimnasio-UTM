import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasRolesGuard } from '../../../guards/has-roles.guard';
import { EquiposComponent } from './equipos.component';

const routes: Routes = [
  {
    path: '',
    component: EquiposComponent
  },
  {
    /*canActivate: [hasRolesGuard],
    canLoad: [hasRolesGuard],
    data: {
      expectedRole: ['Administrador', 'Entrenador']
    },*/
    path: 'mantenimiento',
    loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)
  },
  {

    canActivate: [hasRolesGuard],
    canLoad: [hasRolesGuard],
    data: {
      expectedRole: ['ESTUDIANTE']
    },
    path: 'registrar',
    loadChildren: () => import('./registros/registros.module').then(m => m.RegistrosModule)
  },
  {
    path: ':id',  // Ruta para subruta :id
    children: [
      {
        canActivate: [hasRolesGuard],
        canLoad: [hasRolesGuard],
        data: {
          expectedRole: ['Administrador', 'Entrenador']
        },
        path: 'historial',  // Subruta :id/historial
        loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
