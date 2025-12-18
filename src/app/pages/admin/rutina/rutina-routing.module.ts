import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutinaComponent } from './rutina.component';

const routes: Routes = [
  {
    path: '',
    component: RutinaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutinaRoutingModule { }
