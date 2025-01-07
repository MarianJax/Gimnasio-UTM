import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  model: any[] = [];
  declaracionAceptada = false;
  menu_final: any = [];

  constructor(
    public layoutService: LayoutService,
  ) { }

  ngOnInit() {
    // let session = sessionStorage.getItem(this.eventos._DATOS_GENERALES_LOGIN);
    // let session_rn: any = sessionStorage.getItem(this.eventos._DATOS_REGISTRO_NACIONAL);
    // let usuario = session ? JSON.parse(session) : null;

    // if (!usuario) {
    //   this.eventos.cerrar_sesion();
    // } else {
    //   this.eventos.usuario = usuario;
    //   this.eventos.datos_personales = JSON.parse(session_rn);
    // }

    // if (typeof this.eventos.usuario.p_usuario !== "undefined" && this.eventos.usuario.p_usuario.includes("@utm.edu.ec")) {
    //   let menu = this.eventos.usuario.p_menu_defecto;
    //   localStorage.setItem(this.eventos._MENU_DEFECTO, JSON.stringify(menu));

    //   for (let i = 0; i < menu.length; i++) {
    //     let item = menu[i];
    //     this.menu_final.push({
    //       label: item.menu_rol_menu.descripcion,
    //       icon: item.menu_rol_menu.icono,
    //       routerLink: [item.menu_rol_menu.ruta],
    //       visible: true
    //     });
    //   }
    //   console.log(this.menu_final)
    //   this.model = [{
    //     label: 'Administración',
    //     items: this.menu_final
    //   }];
    // } else {
    //   this.api.mostrar_menu({
    //     idrol: 55,
    //     idapp: 26,
    //     idmod: 22
    //   }).subscribe((resp) => {
    //     let menu = resp[0].p_menu;
    //     localStorage.setItem(this.eventos._MENU_DEFECTO, JSON.stringify(menu));
    //     for (let i = 0; i < menu.length; i++) {
    //       let item = menu[i];
    //       this.menu_final.push({
    //         label: item.menu_rol_menu.descripcion,
    //         icon: item.menu_rol_menu.icono,
    //         routerLink: [item.menu_rol_menu.ruta],
    //         visible: true
    //       });
    //     }        
    //     this.model = [{
    //       label: 'Nivelación',
    //       items: this.menu_final
    //     }];
    //   }, (err) => {
    //     alert("Error en el servidor, actualice e intente nuevamente...");
    //   });
    // }
    // this.api.estadoDeclaracion$.subscribe(estado => {
    //   this.declaracionAceptada = estado === 'aceptada';
    //   this.actualizarVisibilidadElementos();
    // });
    // this.actualizarVisibilidadElementos();
    this.model = [
      {
        items: [
          {
            label: 'Rutinas',
            icon: 'home',
            routerLink: ['/'],
            visible: true
          },
          {
            label: 'Agendamiento',
            icon: 'calendar',
            routerLink: ['/agendamiento'],
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
