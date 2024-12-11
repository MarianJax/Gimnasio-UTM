import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'maquinas', loadChildren: () => import('./maquinas/maquinas.module').then(m => m.maquinasModule) }
    ])],
    exports: [RouterModule]
})
export class inventarioRoutingModule { }
