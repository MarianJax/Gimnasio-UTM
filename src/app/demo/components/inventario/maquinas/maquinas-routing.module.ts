import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaquinasComponent } from './maquinas.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MaquinasComponent}
    ])],
    exports: [RouterModule]
})
export class MaquinasRoutingModule { }
