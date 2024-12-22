import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';


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
        this.mostrar_modal_nivelacion()

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

    mostrar_modal_nivelacion(): void {
        this.cargar = true;
        this.api.obtener_configuracion_numeracion({
            codigo: "CRONOGRAMA POSTULACION"
        }).subscribe((resp) => {
            if (resp[0].p_status == "True") {
                if (resp[0].p_datos_numeracion.length > 0) {
                    this.parametros = JSON.parse(resp[0].p_datos_numeracion[0].texto);
                    this.display_cronograma = true;
                    this.obtener_configuracion_botones_iniciales();
                }
            } else {
                this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
            }
        }, (err) => {
            this.cargar = false;
            this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
        });
    }

    obtener_configuracion_botones_iniciales() {
        this.api.obtener_configuracion({
            codigo: "BOTONES INICIO POSTULACION"
        }).subscribe((resp) => {
            this.objetos_enlaces = resp.p_datos_configuraciones[0].parametros;
            this.obtener_configuracion_numeracion();
        }, (err) => {
            this.cargar = false;
            this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
        });
    }

    obtener_configuracion_numeracion() {
        this.api.obtener_configuracion_numeracion({
            codigo: "PERIODO ACTIVO POSTULACION"
        }).subscribe((resp) => {
            if (resp[0].p_status == "True") {
                if (resp[0].p_datos_numeracion.length > 0) {
                    this.periodo = resp[0].p_datos_numeracion[0].texto;
                }
            }
            this.cargar = false;
        }, (err) => {
            this.cargar = false;
            this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
        });
    }

    mostrar_modal(mensaje: string): void {
        this.mensaje_modal = mensaje;
        this.display_mensajes = true;
    }

    autenticar() {
        if (this.usuarioForm.valid) {
            if (this.usuarioForm.value.usuario.includes("@utm.edu.ec")) {
                this.autenticar_utm();
            } else {
                this.cargar = true
                this.api.autenticar(this.usuarioForm.value).subscribe((resp) => {
                    this.cargar = false;
                    if (resp[0].p_status == 0) {
                        this.eventos.usuario = resp[0];
                        this.eventos.datos_personales = resp[0].p_datos;
                        this.api.token = resp[0].p_token;
                        localStorage.setItem(this.eventos._AUTH_TOKEN, resp[0].p_token);
                        sessionStorage.setItem(this.eventos._DATOS_GENERALES_LOGIN, JSON.stringify(this.eventos.usuario));
                        sessionStorage.setItem(this.eventos._DATOS_REGISTRO_NACIONAL, JSON.stringify(this.eventos.datos_personales));

                        if (resp[0].p_datos.estadoregistronacional == "NO HABILITADO") {
                            this.mensajes = '';
                            this.mensajes = resp[0].p_datos.observacionpoblacion;
                            this.mostrar_modal(this.mensajes);
                            return;
                        }

                        if (resp[0].p_datos.inscrito == 0) {
                            // console.log("llegue")
                            if (resp[0].p_datos.estados_periodo != this.periodo) {
                                this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
                            } else {
                                this.router.navigate(["nivelacion/terminos_condiciones"]);
                                // this.mostrar_modal("Su usuario o clave son incorrectos, intente nuevamente...");
                            }
                        } else {
                            if (resp[0].p_datos.estados_periodo != this.periodo) {
                                this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
                            } else {
                                this.cargar = false
                                // this.api.aceptarDeclaracion();
                                // this.router.navigate(["nivelacion/comprobante_inscripcion"]);
                                this.router.navigate(["nivelacion/terminos_condiciones"]);
                            }
                        }
                    } else if (resp[0].p_status == 1) {
                        this.cargar = false
                        this.eventos.mensaje('info', 'Por favor cambie su contraseña...');
                        this.eventos.datos_personales = resp[0].p_datos;
                        sessionStorage.setItem(this.eventos._DATOS_REGISTRO_NACIONAL, JSON.stringify(this.eventos.datos_personales));
                        setTimeout(() => {
                            this.mostrar_modal("Por favor cambie su contraseña...");
                            console.log("modal cambiar contraseña");
                            this.router.navigate(["clave_cambiar"]);
                        }, 1000);
                    } else {
                        if (resp[0].p_error == "no le toca") {
                            this.mostrar_modal("Según su último dígito de su cédula, su fecha de registro no corresponde...");

                        }

                        if (resp[0].p_error == "no") {
                            this.mostrar_modal("Usuario o contraseña incorrectos...");
                        } else {
                            this.mostrar_modal(resp[0].p_error);
                        }
                    }
                }, (err) => {
                    this.cargar = false
                    this.mostrar_modal("Error en el servidor, actualice e intente nuevamente...");
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


    cambiar_clave(): void {
        this.datos_cambiar_clave.usuario = this.usuarioForm.value.usuario.replace('@utm.edu.ec', '');
        this.datos_cambiar_clave.clave_anterior = this.usuarioForm.value.password;
        this.cargar = true;
        this.api.cambiar_clave(this.datos_cambiar_clave).subscribe((resp) => {
            this.cargar = false;
            if (resp[0].p_status == 'True') {
                // this.eventos.mensaje('success', resp[0].p_error);
                // this.modalVisible = false;
                // this.mostrarModalConf()
            } else {
                // this.eventos.mensaje('warning', resp[0].p_error);
            }
        }, (err) => {
            this.cargar = false;
            // this.eventos.mensaje('error', 'Error en el servidor, intente nuevamente...');
        });
    }

    clavetemporal() {
        this.router.navigate(["/clave_temporal"]);
    }

    saltar_login() {
        this.router.navigate(["nivelacion/declaracion_veracidad"]);
    }
}

