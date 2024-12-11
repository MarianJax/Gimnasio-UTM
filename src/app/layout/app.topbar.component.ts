import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { EventosService } from '../services/eventos.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

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
        public eventos: EventosService,
        public api: ApiService,
        private router: Router,
    ) {
        let session = sessionStorage.getItem(this.eventos._DATOS_GENERALES_LOGIN);
        let session_rn: any = sessionStorage.getItem(this.eventos._DATOS_REGISTRO_NACIONAL);
        let usuario = session ? JSON.parse(session) : null;

        if (!usuario) {
            this.eventos.cerrar_sesion();
        } else {
            this.eventos.usuario = usuario;
            this.eventos.datos_personales = JSON.parse(session_rn);
        }

        this.theme = localStorage.getItem(this.eventos._THEME_UTM_PRINCIPAL);
        this.colorScheme = localStorage.getItem(this.eventos._COLOR_SCHEME_UTM_PRINCIPAL);
        if (this.theme) {
            this.changeTheme(this.theme, this.colorScheme);
        } else {
            this.theme = "saga-green";
            this.colorScheme = "light";
        }
        if (session_rn) {
            this.nombre_usuario = this.eventos.datos_personales.apellidos + ' ' + this.eventos.datos_personales.nombres;
            this.cedula = this.eventos.datos_personales.identificacion;
        } else {
            this.nombre_usuario = this.eventos.usuario.p_funcionario;
            this.cedula = this.eventos.usuario.p_cedula;
        }
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
        localStorage.setItem(this.eventos._THEME_UTM_PRINCIPAL, this.theme);
        localStorage.setItem(this.eventos._COLOR_SCHEME_UTM_PRINCIPAL, this.colorScheme);
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
        this.api.logout();
        //this.router.navigate(['/auth/login']);
    }





}
