import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  items!: MenuItem[];
  cerrar_sesion!: MenuItem[];

  nombre_usuario: any;
  cedula: any;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  theme: any;
  colorScheme: any;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
  ) {
    // let session = sessionStorage.getItem(this.eventos._DATOS_GENERALES_LOGIN);
    // let session_rn: any = sessionStorage.getItem(this.eventos._DATOS_REGISTRO_NACIONAL);
    // let usuario = session ? JSON.parse(session) : null;

    // if (!usuario) {
    //     this.eventos.cerrar_sesion();
    // } else {
    //     this.eventos.usuario = usuario;
    //     this.eventos.datos_personales = JSON.parse(session_rn);
    // }

    this.theme = localStorage.getItem('theme_utm_gimnasio');
    this.colorScheme = localStorage.getItem('color_scheme_utm_gimnasio');
    if (this.theme) {
      this.changeTheme(this.theme, this.colorScheme);
    } else {
      this.theme = "saga-green";
      this.colorScheme = "light";
    }
    // if (session_rn) {
    //     this.nombre_usuario = this.eventos.datos_personales.apellidos + ' ' + this.eventos.datos_personales.nombres;
    //     this.cedula = this.eventos.datos_personales.identificacion;
    // } else {
    //     this.nombre_usuario = this.eventos.usuario.p_funcionario;
    //     this.cedula = this.eventos.usuario.p_cedula;
    // }
    this.cerrar_sesion = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Ver Perfil',
            icon: 'pi pi-user'
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.cerrarSesion();
            }
          }
        ]
      }
    ]
  }

  cambiar_modo_oscuro() {
    if (this.colorScheme == "light") {
      this.theme = "arya-orange";
      this.colorScheme = "dark";
    } else {
      this.theme = "saga-green";
      this.colorScheme = "light";
    }
    localStorage.setItem('theme_utm_gimnasio', this.theme);
    localStorage.setItem('color_scheme_utm_gimnasio', this.colorScheme);
    this.changeTheme(this.theme, this.colorScheme);
  }

  changeTheme(theme: string, colorScheme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
    this.layoutService.config.colorScheme
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }
  cerrarSesion() {
    this.router.navigate(['/auth/login']);
  }
}
