import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';

import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './sidebar/menu/menu.component';
import { MenuitemComponent } from './sidebar/menuitem/menuitem.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MenuitemComponent,
    TopbarComponent,
    FooterComponent,
    MenuComponent,
    SidebarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ToastModule,
    MenuModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    HttpClientModule,
    // AppConfigModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
