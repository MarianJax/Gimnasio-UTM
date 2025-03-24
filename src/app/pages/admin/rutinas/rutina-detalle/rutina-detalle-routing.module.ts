import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutinaDetalleComponent } from './rutina-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: RutinaDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutinaDetalleRoutingModule { }
