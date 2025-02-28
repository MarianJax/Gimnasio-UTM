import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuModule } from 'primeng/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IconModule } from './components/icons/icons.module';

import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    MenuModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
