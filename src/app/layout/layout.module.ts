import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { IconModule } from "../components/icons/icons.module";
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './sidebar/menu/menu.component';
import { MenuitemComponent } from './sidebar/menuitem/menuitem.component';


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
    IconModule,
    ScrollPanelModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
