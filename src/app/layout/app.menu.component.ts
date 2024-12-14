import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ApiService } from '../services/api.service';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];
  declaracionAceptada = false;
  menu_final: any = [];

  constructor(
    public layoutService: LayoutService,
    private api: ApiService,
    private eventos: EventosService
  ) { }

  ngOnInit() {
 this.model=[
  {
    label:'Inicio', 
    items:[
      {
        label:'Inicio',
        icon:'pi pi-fw pi-home',
        routerLink: ['/Inicio/proceso_Inicio'],
        visible: true,
      
      },
      ]
      },
      {
        label :'',
        items:[

      {
        label:'Entrenamiento',
        icon:'pi pi-fw pi-home',
        routerLink: ['/Entrenamiento/entrenamientoEntrenamiento'],
        visible: true,
        
      },
    ]
  },
  {
    label :'',
    items:[
        {
          label:'Agendamiento',
          icon:'pi pi-fw pi-home',
          routerLink: ['agemdamiento.component.html'],
          visible: true,
        },
      ]
    },
    {
      label :'',
      items:[
        {
          label:'Membresia',
          icon:'pi pi-fw pi-home',
          routerLink: ['/Membresia/proceso_membresia'],
          visible: true,
          
        }
      ]
    
  }
 ]
  }



}
