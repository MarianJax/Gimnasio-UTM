import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasRolesGuard } from '../../guards/has-roles.guard';
import { MembresiaComponent } from './membresia.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {
    canActivate: [hasRolesGuard],
    canLoad: [hasRolesGuard],
    data: {
      expectedRole: ['DOCENTE', 'DOCENTE TIPO 2', 'ESTUDIANTE', 'FUNCIONARIO'],
    },
    path: '',
    children: [
      {
        path: '',
        component: MembresiaComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembresiaRoutingModule {}
