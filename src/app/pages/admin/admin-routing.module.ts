import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './equipos/equipos.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { HistorialComponent } from './historial/historial.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { PagosComponent } from './pagos/pagos.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'ejercicios', component: EjerciciosComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'mantenimiento', component: MantenimientoComponent },
  { path: 'pagos', component: PagosComponent},
  { path: 'rutinas', component: RutinasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
