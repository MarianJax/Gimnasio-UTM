import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminRoutingModule } from './pages/admin/admin-routing.module';

@NgModule({

  imports: [BrowserModule, AppRoutingModule],

  providers: [],

  bootstrap: [AppComponent],

  declarations: [

  ],

})

export class AppModule { }
