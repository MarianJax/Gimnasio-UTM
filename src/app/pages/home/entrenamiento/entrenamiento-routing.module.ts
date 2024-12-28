import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrenamientoComponent } from './entrenamiento.component';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientoComponent,
    children: [
      {
        path: 'pagos',
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule)
      },
      {
        path: 'lista',
        loadChildren: () => import('./lista/lista.module').then(m => m.ListaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrenamientoRoutingModule { }
