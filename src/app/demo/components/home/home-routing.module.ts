import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'rutinas', loadChildren: () => import('./rutinas/rutinas.module').then(m => m.RutinasModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
