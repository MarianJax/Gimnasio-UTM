import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
// import { MessageService } from 'primeng/api';
// import * as moment from 'moment';
// import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class EventosService {

    public _NOMBRE_APP: string = 'UTM PRINCIPAL';
    public _AUTH_TOKEN: string = 'auth_token_postulacion_utm';
    public _DATOS_GENERALES_LOGIN: string = 'datos_generales_login_postulacion_utm';
    public _DATOS_REGISTRO_NACIONAL: string = 'datos_registro_nacional_postulacion_utm';
    public _MENU_DEFECTO: string = 'menu_defecto_utm_postulacion';
    public _THEME_UTM_PRINCIPAL: string = 'theme_utm_postulacion';
    public _COLOR_SCHEME_UTM_PRINCIPAL: string = 'color_scheme_utm_postulacion';

    public _ANIO_INICIO = 2022;
    public _ANIO_FIN = 2026;
    public _ID_APLICACION = 26;

    public datos_personales: any = {
        codigoies: '',
        identificacion: '',
        accesocompinternetcamaraweb: '',
        apellidos: '',
        autoidentificacion: '',
        calificacion: '',
        camaraweb: '',
        cantonreside: '',
        casalote: '',
        celular: '',
        celularreplegal: '',
        cierrecarnetdiscapacidad: '',
        cierreprcjdiscapacidad: '',
        cierretipodiscapacidad: '',
        codigoautoidentificacion: '',
        codigocantonreside: '',
        codigoconsuladoembajada: '',
        codigogenero: '',
        codigonacionalidad: '',
        codigopaisreside: '',
        codigoparroquiareside: '',
        codigoprovinciareside: '',
        codigopuebloindigena: '',
        computadoradomicilio: '',
        correo: '',
        correoapoyo: '',
        cuadrohonor: '',
        distincioncuadrohonor: '',
        efectivizocupofocalizadop25: '',
        efectivizocupoper25: '',
        emailreplegal: '',
        estadobeca: '',
        estadocivil: '',
        estadoregistronacional: '',
        fecha_inicio_prueba: '',
        fechanacimiento: '',
        fecharegistronacional: '',
        focalizadopendregistrop26: '',
        genero: '',
        identificacionapoyo: '',
        insbarriosector: '',
        inscalleprincipal: '',
        inscallesecundaria: '',
        insestado: '',
        inspoblacion: '',
        inssexo: '',
        internetdomicilio: '',
        mensajerespuesta: '',
        nacionalidad: '',
        nombreapoyo: '',
        nombrecentrocaippl: '',
        nombreconsulado: '',
        nombrereplegal: '',
        nombres: '',
        numerodocreplegal: '',
        observacionbeca: '',
        observacionefeccupo: '',
        observacionestado: '',
        observacionfocalizap25: '',
        observacionfocalizap26: '',
        observacionpoblacion: '',
        origenconsumowsmsp: '',
        paisreside: '',
        parroquiareside: '',
        ppl: '',
        provinciareside: '',
        puebloindigena: '',
        requiereapoyodiscapacidad: '',
        tipodocreplegal: '',
        tipodocumento: '',
        tipodocumentoapoyo: '',
        tipounidadeducativa: '',
        titulocuartonivel: '',
        titulohomologado: '',
        titulotercernivel: '',
        ubicacioncuadrohonor: '',
        unidadeducativa: '',
        codigoclave: '',
        fechacambioclave: '',
        idregistro_persona: '',
        inscrito: '',
        nota: '',
        apikey: '',
        puntaje_mayor_4ultimos: '',
        fecha_prueba: '',
        periodo: '',
        nota_utm: '',
        nota_accion_afirmativa: '',
        sede: '',
        idinscripcion: -1
    }
        ;

    public usuario: any = {
        p_error: "",
        p_status: 0,
        p_roles: [{
            descripcion: 'ESTUDIANTE'
        }],
        p_aplicacion: [{
            descripcion: 'NO DEFINIDO'
        }],
        p_modulo: [{
            descripcion: 'NO DEFINIDO'
        }],
        p_rol_defecto: -1,
        p_rol_defecto_descripcion: "",
        p_aplicacion_defecto: -1,
        p_aplicacion_defecto_descripcion: "",
        p_modulo_defecto: -1,
        p_modulo_defecto_descripcion: "",
        p_menu_defecto: [{
            menu_rol_menu: {
                descripcion: "NO DEFINIDO",
                ruta: ""
            }
        }],
        p_funcionario: "",
        p_idpersonal: -1,
        p_indice_puesto_nombre: "",
        p_cedula: "1314702018",
        p_nombres: "Marian",
        p_apellidos: "Parrales",
        p_escuelas: "",
        p_departamentos: ""
    };

    constructor(
        // private spinner: NgxSpinnerService,
        private router: Router,
        // private service: MessageService
    ) {

    }

    public cerrar_sesion() {
        console.log(this._AUTH_TOKEN)
        localStorage.removeItem(this._AUTH_TOKEN);
        sessionStorage.removeItem(this._DATOS_GENERALES_LOGIN);
        sessionStorage.removeItem(this._DATOS_REGISTRO_NACIONAL);
        sessionStorage.removeItem(this._MENU_DEFECTO);
        this.router.navigate(['login']);
    }

    public validar_token(sesion: string) {
        if (sesion == 'False') {
            // this.mensaje('warning', 'Su sesión ha expirado, inicie sesión nuevamente...');
            this.cerrar_sesion();
            return;
        }
    }

    public loading(dato: any) {
        // if (dato) {
        //     this.spinner.show();
        // } else {
        //     this.spinner.hide();
        // }
    }

    public mensaje(type: string, message: string) {
        console.log(type, message)
        // this.service.add({ key: 'tst', severity: type, summary: 'Success Message', detail: message });
    }

    public formatear_fecha(fecha: any, formato: any) {
        return moment(fecha).format(formato);
    }

    public formatear_hora(hora: any, formato: any) {
        return moment(hora).format(formato);
    }

}
