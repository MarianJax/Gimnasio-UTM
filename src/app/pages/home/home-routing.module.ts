import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasRolesGuard } from '../../guards/has-roles.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    canActivate: [hasRolesGuard],
    canLoad: [hasRolesGuard],
    data: {
      expectedRole: ['DOCENTE', 'ESTUDIANTE', ],
    },
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
