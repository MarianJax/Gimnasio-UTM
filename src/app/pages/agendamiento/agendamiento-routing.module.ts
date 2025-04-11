import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamientoComponent } from './agendamiento.component';
import { RegistroComponent } from '../membresia/registro/registro.component';
import { HomeComponent } from '../home/home.component';
import { hasRolesGuard } from '../../guards/has-roles.guard';

const routes: Routes = [
  {

    canActivate: [hasRolesGuard],
    canLoad: [hasRolesGuard],
    data: {
      expectedRole: ['Estudiante', 'Funcionario', 'Docente']
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
