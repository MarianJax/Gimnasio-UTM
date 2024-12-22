import { Component, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  constructor(public layoutService: LayoutService, public el: ElementRef) {}

  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: ['/'],
    },
    {
      label: 'Entrenamiento',
      icon: 'pi pi-box',
      routerLink: ['/entrenamiento'],
    },
    {
      label: 'Agendamiento',
      icon: 'pi pi-calendar',
      routerLink: ['/agendamiento'],
    },
    {
      label: 'Membresia',
      icon: 'pi pi-id-card',
      routerLink: ['/membresia'],
    },
    
    {
      label: 'Calendario',
      icon: 'pi pi-id-card',
      routerLink: ['/calendar'],
    }
  ];
}
