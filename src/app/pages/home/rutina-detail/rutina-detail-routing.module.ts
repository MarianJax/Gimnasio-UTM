import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutinaDetailComponent } from './rutina-detail.component';

import { AgendamientoComponent } from '../../agendamiento/agendamiento.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RutinaDetailComponent
      },
      {
        path: 'pago',
        component: AgendamientoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutinaDetailRoutingModule { }
