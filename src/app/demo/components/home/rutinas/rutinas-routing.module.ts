import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RutinasComponent } from './rutinas.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RutinasComponent }
    ])],
    exports: [RouterModule]
})
export class RutinasRoutingModule { }
