import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/layout.service';

interface Rol {
  name: string;
  code: string;
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  changeRol: boolean = false;
  items!: MenuItem[];
  cerrar_sesion!: MenuItem[];
  roles: Rol[] = [];

  nombre_usuario: any;
  cedula: any;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
  ) {
    let session = sessionStorage.getItem('session-usuario');
    let usuario = session ? JSON.parse(session) : null;

    this.nombre_usuario = usuario ? usuario.nombres : 'No hay';

    this.cerrar_sesion = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Ver Perfil',
            icon: 'pi pi-user',
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.cerrarSesion();
            },
          },
        ],
      },
    ];

    if (usuario.roles_array) {
      this.roles = usuario.roles_array.map((rol: string) => ({
        label: rol.split('|')[1],
        action: () => this.cambiarRol(rol.split('|')[1]),
      }));
    }
    this.changeRol = true;
  }

  cambiarRol(id: string) {
    const session = sessionStorage.getItem('session-usuario');
    if (session) {
      const usuario = JSON.parse(session);
      usuario.rol = id;
      sessionStorage.setItem('session-usuario', JSON.stringify(usuario));
      this.getPagebyRol(id);
    }
  }

  cerrarSesion() {
    sessionStorage.removeItem('session-usuario');
    this.router.navigate(['/auth/login']);
  }

  getPagebyRol(rol: string) {
    switch (rol) {
      case 'Administrador':
      case 'Entrenador':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}
