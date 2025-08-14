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
      console.log('Ruta de administración detectada', usuario.rol);
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

  private actualizarVisibilidadElementos() {
    this.model = [
      {
        label: 'Nivelación',
        items: [
          {
            label: 'Declaración de Veracidad',
            icon: 'pi pi-fw pi-home',
            // command: true,
            visible: !this.declaracionAceptada
          },
          {
            label: 'Proceso Nivelación',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/proceso_nivelacion'],
            visible: this.declaracionAceptada
          },
          {
            label: 'Comprobante Inscripcion',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/comprobante'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Lugar y Fecha de Prueba',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/lugar_prueba'],
            visible: this.declaracionAceptada
          },
          {
            label: 'Postulación Carreras',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/seleccionar_carrera'],
            visible: this.declaracionAceptada
          },
          {
            label: 'Asignación / Aceptación Cupo',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/aceptar_cupo'],
            visible: this.declaracionAceptada
          },
          {
            label: 'Reportes Generales',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/reportes_generales'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Listado de Aspirantes Asignados',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/listado-aspirantes-asignados'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Listado de Notas Senescyt',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/listado-notas-senescyt'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Listado de Orden de Postulación',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/listado-orden-postulacion'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Listado de Cupo Aceptado',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/listado-cupo-aceptado'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Listado de Procesados',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/nivelacion/listado-procesados'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Reiniciar Clave ',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/reiniciar_clave'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Certificados Notas ',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/certificados-notas'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Reporte Postulacion ',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/reporte_postulacion'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Min Max por Segmento',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/min_max_segmento'],
            visible: this.declaracionAceptada
          },

          {
            label: 'Cupos por Periodo',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/nivelacion/cupos_periodo'],
            visible: this.declaracionAceptada
          }
        ]
      },
    ];
  }

  // aceptarDeclaracion() {
  //   this.api.aceptarDeclaracion();
  // }
}
