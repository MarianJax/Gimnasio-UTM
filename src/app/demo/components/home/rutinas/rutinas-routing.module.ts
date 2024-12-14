import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RutinasComponent } from './rutinas.component';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'rutinas', component: AppLayoutComponent, children: [
            { path: 'f', component: RutinasComponent },
            //{ path: '[id]', component: EjerciciosComponent }
        ] }
    ])],
    exports: [RouterModule]
})
export class RutinasRoutingModule { }
