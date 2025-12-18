import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  model: any[] = [];
  declaracionAceptada = false;
  menu_final: any = [];

  constructor(
    public layoutService: LayoutService,
    private router: Router
  ) { }


  ngOnInit() {
    let session = sessionStorage.getItem('session-usuario');
    let usuario = session ? JSON.parse(session) : null;

    this.updateMenuBasedOnPath();

    // // Si deseas detectar cambios en la ruta (navegación dinámica), puedes suscribirte a los eventos de navegación
    this.router.events.subscribe(() => {
      this.updateMenuBasedOnPath();
    });
  }

  private updateMenuBasedOnPath() {
    let session = sessionStorage.getItem('session-usuario');
    let usuario = session ? JSON.parse(session) : null;
    const currentPath = this.router.url;

    if (currentPath.startsWith('/admin')) {
      // Rutas para la sección de administración
      this.model = [
        {
          items: [
            {
              label: 'Dashboard',
              icon: 'dashboard',
              routerLink: ['/admin'],
              visible: true
            },
            {
              label: 'Equipos',
              icon: 'calendar',
              routerLink: ['/admin/equipos'],
              visible: true
            },
            {
              label: 'Rutinas',
              icon: 'ejercicio',
              routerLink: ['/admin/rutinas'],
              visible: true
            },
            {
              label: 'Pagos',
              icon: 'dollar',
              routerLink: ['/admin/pagos'],
              visible: !['ENTRENADOR'].includes(usuario.rol)
            },
            {
              label: 'Horarios',
              icon: 'calendar-plus',
              routerLink: ['/admin/horarios'],
              visible: true
            },
            {
              label: 'Tarifas y Cupos',
              icon: 'money',
              routerLink: ['/admin/tarifas'],
              visible: !['ENTRENADOR'].includes(usuario.rol)
            }
          ]
        }
      ];
    } else {
      // Rutas generales
      this.model = [
        {
          items: [
            {
              label: 'Agendamiento',
              icon: 'calendar',
              routerLink: ['/'],
              visible: true
            },
            {
              label: 'Membresia',
              icon: 'id-card',
              routerLink: ['/membresia'],
              visible: true
            },
          ]
        },
        {
          label: ''
        }
      ];
    }
  }

}
