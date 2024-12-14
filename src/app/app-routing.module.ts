import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { MaquinasComponent } from './demo/components/inventario/maquinas/maquinas.component';
import { RutinasComponent } from './demo/components/home/rutinas/rutinas.component';


const routes: Routes = [
  { path: '', component: AppLayoutComponent, children:[{path:'Rutinas',component:RutinasComponent}]},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
