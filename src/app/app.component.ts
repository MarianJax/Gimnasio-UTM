import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/layout.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutService: LayoutService,
    private httpClient: HttpClient
  ) { }

  private config: any;

  ngOnInit() {
    this.httpClient
      .get<{ version: string }>("/assets/config.json")
      .subscribe(config => {
        this.config = config;
        console.log(this.config.version);
      });

    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    this.httpClient
      .get<{ version: string }>("/assets/config.json", { headers })
      .subscribe(config => {
        if (config.version !== this.config.version) {
          location.reload();
        }
      });

    this.primengConfig.ripple = true;       //enables core ripple functionality

    //optional configuration with the default configuration
    this.layoutService.config = {
      ripple: false,                      //toggles ripple on and off
      inputStyle: 'outlined',             //default style for input elements
      menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
      theme: 'lara-light-indigo',         //default component theme for PrimeNG
      scale: 14                           //size of the body font size to scale the whole application
    };
  }
}
