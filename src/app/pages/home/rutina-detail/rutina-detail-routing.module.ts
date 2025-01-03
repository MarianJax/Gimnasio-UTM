import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutinaDetailComponent } from './rutina-detail.component';
import { PagosComponent } from './pagos/pagos.component';

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
        component: PagosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutinaDetailRoutingModule { }
