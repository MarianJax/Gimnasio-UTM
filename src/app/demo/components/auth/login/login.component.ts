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
        let cedula = this.api.url_siga.includes("https://app") ? "" : "1313034256";
        this.usuarioForm = this.fb.group({
            usuario: ["", [Validators.required]],
            password: ["", [Validators.required]],
            remember: [true]
        });

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

    autenticar() {
        if (this.usuarioForm.valid) {
            if (this.usuarioForm.value.usuario.includes("@utm.edu.ec")) {
                this.autenticar_utm();
            } else {
                this.cargar = true
                this.api.autenticar(this.usuarioForm.value).subscribe((resp) => {
                    this.cargar = false;
                    //if (resp[0].p_status == 0) {
                        if (resp[0].p_status == 0) {
                        this.eventos.usuario = resp[0];
                        this.eventos.datos_personales = resp[0].p_datos;
                        this.api.token = resp[0].p_token;
                        localStorage.setItem(this.eventos._AUTH_TOKEN, resp[0].p_token);
                        sessionStorage.setItem(this.eventos._DATOS_GENERALES_LOGIN, JSON.stringify(this.eventos.usuario));
                        sessionStorage.setItem(this.eventos._DATOS_REGISTRO_NACIONAL, JSON.stringify(this.eventos.datos_personales));

                    } else if (resp[0].p_status == 1) {
                        this.cargar = false
                        this.eventos.mensaje('info', 'Por favor cambie su contraseña...');
                        this.eventos.datos_personales = resp[0].p_datos;
                        sessionStorage.setItem(this.eventos._DATOS_REGISTRO_NACIONAL, JSON.stringify(this.eventos.datos_personales));
                        setTimeout(() => {
                            console.log("modal cambiar contraseña");
                            this.router.navigate(["clave_cambiar"]);
                        }, 1000);
                    } else {
                        //if (resp[0].p_error == "no le toca") {
                           // this.mostrar_modal("Según su último dígito de su cédula, su fecha de registro no corresponde...");

                        //}
                        console.log(resp[0].p_error, resp[0]);
                        if (resp[0].p_error == "no") {
                            console.log("Usuario o contraseña incorrectos...")

                            //this.mostrar_modal("Usuario o contraseña incorrectos...");
                        } else {
                            console.log(resp[0].p_error)
                            //this.mostrar_modal(resp[0].p_error);
                        }
                    }
                }, (err) => {
                    this.cargar = false
                    
                    console.log("Error en el servidor, actualice e intente nuevamente...")
                    //this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
                });
            }
        } else {
            Object.values(this.usuarioForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    autenticar_utm() {
        this.api.autenticar_utm({
            usuario: this.usuarioForm.value.usuario,
            password: this.usuarioForm.value.password,
            aplicacion: this.eventos._ID_APLICACION
            // this.usuarioForm.value
        }).subscribe((resp) => {
            if (resp[0].p_status == 0) {
                this.eventos.loading(false);
                this.eventos.usuario = resp[0];
                this.api.token = resp[0].p_token;
                localStorage.setItem(this.eventos._AUTH_TOKEN, resp[0].p_token);
                sessionStorage.setItem(this.eventos._DATOS_GENERALES_LOGIN, JSON.stringify(this.eventos.usuario));
                sessionStorage.setItem(this.eventos._DATOS_GENERALES_LOGIN, JSON.stringify(this.eventos.usuario));

                this.router.navigate(["dashboard"]);
            } else if (resp[0].p_status == 1) {
                this.cargar = false;
                this.mensaje = 'Por favor cambie su contraseña...';
                this.display_mensaje = true;
                setTimeout(() => {
                    this.modalVisible = true;
                    console.log("modal cambiar contraseña");
                }, 1000);
            } else {
                if (resp[0].p_error == "no") {
                    this.mensaje = 'Usuario o contraseña incorrectos...';
                    this.display_mensaje = true;
                    this.cargar = false;
                } else {
                    this.mensaje = resp[0].p_error;
                    this.display_mensaje = true;

                    this.cargar = false;
                }
            }
        }, (err) => {
            this.cargar = false;
            this.mensaje = 'Actualice e intente nuevamente...';
            this.display_mensaje = true;
        });
    }

    mostrarModalConf() {
        this.modalService.open(this.myModalConf).result.then(r => {
            console.log("Tu respuesta ha sido: " + r);
        }, error => {
            console.log(error);
        });
    }


    clavetemporal() {
        this.router.navigate(["/clave_temporal"]);
    }

    saltar_login() {
        this.router.navigate(["nivelacion/declaracion_veracidad"]);
    }
}

