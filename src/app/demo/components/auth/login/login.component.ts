import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    @ViewChild("myModalConf", { static: false })
    myModalConf!: TemplateRef<any>;
    // password!: string;
    cargar: boolean = false;
    mensaje: string = "";
    display_mensaje: boolean = false;

    theme: any;
    mensajes: any;
    colorScheme: any;
    display_cronograma: boolean = false;
    display_mensajes: boolean = false;
    titulo_notificacion: string = "";
    mensaje_modal: string = "";
    periodo: string = "";

    texto: string = "";
    objetos_enlaces: any = [];
    parametros: any = [];
    usuarioForm!: FormGroup;
    modalVisible = false;
    isSmallScreen: boolean = false;

    datos_cambiar_clave: any = {
        usuario: '',
        clave_anterior: '',
        clave_nueva: '',
        clave_confirmacion: ''
    };

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        public eventos: EventosService,
        private api: ApiService,
        private router: Router,
        private modalService: NgbModal,
        private messageService: MessageService
    ) {
        this.theme = localStorage.getItem(this.eventos._THEME_UTM_PRINCIPAL);
        this.colorScheme = localStorage.getItem(this.eventos._COLOR_SCHEME_UTM_PRINCIPAL);
        if (this.theme) {
            this.changeTheme(this.theme, this.colorScheme);
        } else {
            this.theme = "saga-green";
            this.colorScheme = "light";
        }
    }

    ngOnInit() {
        this.checkScreenSize();
        window.addEventListener('resize', () => {
            this.checkScreenSize();
        });
    }

    checkScreenSize() {
        this.isSmallScreen = window.innerWidth < 992; // Cambia este valor según el punto de ruptura de tu diseño
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

}
