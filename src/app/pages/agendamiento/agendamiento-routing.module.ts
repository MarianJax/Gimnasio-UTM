import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasRolesGuard } from '../../guards/has-roles.guard';
import { AgendamientoComponent } from './agendamiento.component';

const routes: Routes = [
  {
    canActivate: [hasRolesGuard],
    canLoad: [hasRolesGuard],
    data: {
      expectedRole: ['DOCENTE', 'DOCENTE TIPO 2', 'ESTUDIANTE',],
    },
    path: '',
    component: AgendamientoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamientoRoutingModule {}
