import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { InventarioModule } from './inventario/inventario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LayoutComponent } from './layout/layout.component';
import { AuthModule } from './auth/auth.module';

@NgModule({



  imports: [BrowserModule, AppRoutingModule],

  providers: [],

  bootstrap: [AppComponent],

  declarations: [
    
  ],

})

export class AppModule {}
