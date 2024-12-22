import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventosService } from './eventos.service';
import { BehaviorSubject, Observable } from 'rxjs';
// import io from 'socket.io-client';
// import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url_siga = "https://app.utm.edu.ec:3000/";
  // public url_siga = "http://notificaciones.utm.edu.ec:3000/";
  public url_sipa = "https://app.utm.edu.ec:3001/";
  // public url_sipa = "http://notificaciones.utm.edu.ec:3001/";
  public url_socket = "http://notificaciones.utm.edu.ec:7000/";
  public url_repositorio = "https://notificaciones.utm.edu.ec:99/";
  public url_testadmision = "https://testadmision.utm.edu.ec";
  public url_jsreport = "https://app.utm.edu.ec:5488/api/report";
  public pass_jsreport = "admin:Siga.2018...";

  public _token: any = null;
  public socket: any;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  // private headers = new HttpHeaders().set('access-token', '' + (!localStorage.getItem(this.eventos._AUTH_TOKEN) ? this._token : localStorage.getItem(this.eventos._AUTH_TOKEN)))

  constructor(
    private http: HttpClient,
    private eventos: EventosService
  ) {
    // this.conectar();
  }

  set token(token: any) {
    this._token = token;
  }

  get token() {
    return this._token;
  }

  isLoggedIn() {
    return this.token = localStorage.getItem(this.eventos._AUTH_TOKEN);
  }

  // API SIGA
  obtener_configuracion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'movil/obtener_configuraciones_app', datos, { headers: this.headers });
  }

  obtener_configuracion_numeracion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/obtener_configuracion_numeracion', datos, { headers: this.headers });
  }

  datos_iniciales_reportes(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/datos_iniciales_reportes', datos, { headers: this.headers });
  }

  mostrar_menu(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'mostrar_menu', datos, { headers: this.headers });
  }

  guardar_aceptacion_declaracion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/guardar_aceptacion_declaracion', datos, { headers: this.headers });
  }

  reporte_comprobante_inscripcion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/reporte_comprobante_inscripcion', datos, { headers: this.headers });
  }
  // FIN API SIGA

  // API SIPA
  autenticar(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'autenticar_nivelacion', datos, { headers: this.headers });
  }

  autenticar_utm(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'autenticar', datos, { headers: this.headers });
  }

  lugar_prueba(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'lugar_prueba', datos, { headers: this.headers });
  }

  obtener_periodo_postulacion(datos: any): Observable<any> {
    return this.http.get(this.url_sipa + 'generales/obtener_periodo_postulacion');
  }
  // FIN API SIPA

  // INICIO DASHBOARD

  generar_comprobante_inscripcion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/generar_comprobante_inscripcion', datos, { headers: this.headers });
  }
  cambiar_clave_nivelacion(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'cambiar_clave_nivelacion', datos, { headers: this.headers });
  }
  guardar_inscripcion(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'guardar_inscripcion', datos, { headers: this.headers });
  }

  guardar_moodle(datos: any): Observable<any> {
    return this.http.post(this.url_testadmision + '/ws', datos, { headers: this.headers });
  }

  generar_clave(datos: any): Observable<any> {
    return this.http.post(this.url_repositorio + 'consultar_ws_senescyt', datos, { headers: this.headers });
  }

  ws_senescyt(cedula: any): Observable<any> {
    return this.http.get(this.url_repositorio + "ws_senescyt/" + cedula);
  }

  get_modulos(datos: any): Observable<any> {
    this._token = localStorage.getItem(this.eventos._AUTH_TOKEN);
    this.headers = new HttpHeaders().set('access-token', this._token)
    return this.http.post(this.url_siga + 'get_modulos', datos, { headers: this.headers });
  }

  get_roles(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'get_roles', datos, { headers: this.headers });
  }

  cambiar_clave(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'cambiar_clave', datos, { headers: this.headers });
  }

  obtener_catalogo(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/obtener_catalogo', datos, { headers: this.headers });
  }
  // FIN DASHBOARD

  //DECLARACION VERACIDAD
  private estadoDeclaracionSubject = new BehaviorSubject<'aceptada' | 'pendiente'>('pendiente');
  estadoDeclaracion$ = this.estadoDeclaracionSubject.asObservable();

  aceptarDeclaracion() {
    this.estadoDeclaracionSubject.next('aceptada');
  }

  obtenerEstadoDeclaracion(): 'aceptada' | 'pendiente' {
    return this.estadoDeclaracionSubject.getValue();
  }
  //ENVIAR CORREO

  enviarCorreoElectronico(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'enviar-correo', datos);
  }
  claveGenerada: any;

  //SELECCIONAR CARRERA
  datos_iniciales_postulacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/datos_iniciales_postulacion', datos, { headers: this.headers });
  }
  obtener_datos_carrera_postulacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'generales/mostrar_datos_carrera_postulacion', datos, { headers: this.headers });
  }
  guardar_datos_postulacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "generales/guardar_postulacion", datos, { headers: this.headers })
  }
  reporte_postulacion(idinscripcion: any, idpostulacion: any, cedula: any = undefined, periodo: any = undefined): Observable<any> {
    return this.http.get(this.url_siga + "generales/reporte_postulacion/" + btoa("VISTA PREVIA") + "/" + btoa(idinscripcion) + "/" + btoa(idpostulacion) + "/" + btoa(cedula) + "/" + btoa(periodo));
  }
  aceptar_postulante_datos_iniciales(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "generales/aceptar_postulante_datos_iniciales", datos, { headers: this.headers })
  }
  aceptar_postulante_guardar(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "generales/aceptar_postulante_guardar", datos, { headers: this.headers })
  }
  reporte_aceptacion(idinscripcion: any, idpostulacion: any, identificacion: any = undefined, periodo: any = undefined): Observable<any> {
    return this.http.get(this.url_siga + "generales/reporte_aceptacion/" + btoa("VISTA PREVIA") + "/" + btoa(idinscripcion) + "/" + btoa(idpostulacion) + "/" + btoa(identificacion) + "/" + btoa(periodo));
  }

  reporte_calificaciones(idpersonal: any, periodo: any): Observable<any> {
    return this.http.get(this.url_siga + "generales/reporte_calificaciones/" + btoa("VISTA PREVIA") + "/" + btoa(idpersonal) + "/" + btoa(periodo));
  }

  //CERRAR SESION 
  logout() {
    localStorage.removeItem(this.eventos._AUTH_TOKEN);
    sessionStorage.removeItem(this.eventos._DATOS_GENERALES_LOGIN);
    sessionStorage.removeItem(this.eventos._DATOS_REGISTRO_NACIONAL);
    sessionStorage.removeItem(this.eventos._MENU_DEFECTO);
  }

  // INICIO API periodo, tipo postulacion, jornada y ubicacion prueba
  aspirantes_periodo_datos_iniciales(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "aspirantes/aspirantes_periodo_datos_iniciales", datos, { headers: this.headers })
  }

  aspirantes_periodo_guardar(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "aspirantes/aspirantes_periodo_guardar", datos, { headers: this.headers })
  }

  aspirantes_tipo_postulacion_guardar(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "aspirantes/aspirantes_tipo_postulacion_guardar", datos, { headers: this.headers })
  }

  aspirantes_ubicacion_prueba_guardar(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "aspirantes/aspirantes_ubicacion_prueba_guardar", datos, { headers: this.headers })
  }

  consultar_usuario(cedula: any): Observable<any> {
    return this.http.get(this.url_sipa + "generales/consultar_usuario/" + cedula);
  }

  reiniciar_clave(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "nivelacion/reiniciar_clave", datos, { headers: this.headers })
  }

  jornada_datos_iniciales(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_datos_iniciales', datos, { headers: this.headers });
  }

  jornada_guardar(datos: any): Observable<any> {
    return this.http.post(this.url_siga + "aspirantes/jornada_guardar", datos, { headers: this.headers })
  }

  jornada_mostrar_jornada(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_mostrar_jornada', datos, { headers: this.headers });
  }

  jornada_mostrar_jornada_ubicacion_prueba(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_mostrar_jornada_ubicacion_prueba', datos, { headers: this.headers });
  }

  guardar_jornada_ubicacion_prueba(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_guardar_jup', datos, { headers: this.headers });
  }

  jornada_guardar_jup(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_guardar_jup', datos, { headers: this.headers });
  }

  jornada_mostrar_canton(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_mostrar_canton', datos, { headers: this.headers });
  }

  jornada_mostrar_configura_asignacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_mostrar_configura_asignacion', datos, { headers: this.headers });
  }

  jornada_mostrar_jornada_configura_asignacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_mostrar_jornada_configura_asignacion', datos, { headers: this.headers });
  }

  jornada_guardar_configura_asignacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_guardar_configura_asignacion', datos, { headers: this.headers });
  }

  jornada_reasignar_sitio_prueba(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_reasignar_sitio_prueba', datos, { headers: this.headers });
  }

  jornada_asignar_sitio_prueba(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/jornada_asignar_sitio_prueba', datos, { headers: this.headers });
  }
  // FIN API periodo, tipo postulacion y ubicacion prueba

  // MOODLE  
  asignacion_datos_iniciales(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_datos_iniciales', datos, { headers: this.headers });
  }

  asignacion_mostrar_jornada_ubicacion_prueba(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_mostrar_jornada_ubicacion_prueba', datos, { headers: this.headers });
  }

  asignacion_sincroniza_moodle(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_sincroniza_moodle', datos, { headers: this.headers });
  }

  asignacion_mostrar_subidos(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_mostrar_subidos', datos, { headers: this.headers });
  }

  // FIN MOODLE

  // INICIO API de carreras, carrera periodo, sincroniza moodle y asignaciones
  carreras_datos_iniciales(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/carreras_datos_iniciales', datos, { headers: this.headers });
  }

  carreras_guardar(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/carreras_guardar', datos, { headers: this.headers });
  }

  carrera_periodo_guardar(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/carrera_periodo_guardar', datos, { headers: this.headers });
  }

  parametros_calificacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + '/nivelacion/parametros_calificacion', datos, { headers: this.headers });
  }

  asignacion_politicas_cuotas(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_politicas_cuotas', datos, { headers: this.headers });
  }

  asignacion_mostrar_politicas_cuotas(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_mostrar_politica_cuotas', datos, { headers: this.headers });
  }

  asignacion_accion_afirmativa(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_accion_afirmativa', datos, { headers: this.headers });
  }

  asignacion_mostrar_accion_afirmativa(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_mostrar_accion_afirmativa', datos, { headers: this.headers });
  }

  asignacion_calcula_nota_postulacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_calcula_nota_postulacion', datos, { headers: this.headers });
  }

  asignacion_mostrar_nota_postulacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_mostrar_nota_postulacion', datos, { headers: this.headers });
  }

  asignacion_postulante_politicas_cuotas(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_postulante_politicas_cuotas', datos, { headers: this.headers });
  }

  asignacion_postulante_poblacion_general(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_postulante_poblacion_general', datos, { headers: this.headers });
  }

  asignacion_mostrar_asignados(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_mostrar_asignados', datos, { headers: this.headers });
  }

  asignacion_mostrar_carrera_periodo(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_mostrar_carrera_periodo', datos, { headers: this.headers });
  }

  asignacion_reasignar_cupo_segmento(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_reasignar_cupo_segmento', datos, { headers: this.headers });
  }

  asignacion_cerrar_postulacion(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'aspirantes/asignacion_cerrar_postulacion', datos, { headers: this.headers });
  }
  // FIN API  de carreras, carrera periodo, sincroniza moodle y

  /*
  // Web Socket
  conectar() {
    if (typeof (this.socket) != "undefined") {
      try {
        this.socket.disconnect();
        console.log("Conectar Web Socket..." + this.url_socket);
        // this.socket = io(this.url_socket);
        this.login_web_socket().subscribe(dato => { });
      } catch (error) {
        console.log("Error al conectar Web Socket")
      }
      return;
    } else {      
      console.log("Conectar Web Socket..." + this.url_socket);
      this.socket = io(this.url_socket);
      // console.log(io); 
      console.log(this.socket)      
      this.login_web_socket().subscribe(dato => { 
        console.log(dato)
      });
    }
  }

  login_web_socket() {
    console.log('si llega')
    let observable = new Observable(observer => {      
      this.socket.on('connect', () => {
        console.log("web socket conectado");
        this.socket.emit('login_sgd', this.eventos.usuario.p_idpersonal, 'USUARIO');
      });
    })
    // console.log(observable)
    return observable;
  }

  obtener_notificacion() {
    let observable = new Observable(observer => {
      this.socket.on('notificacion', (data: any) => {
        observer.next(data);
      });
    });
    return observable;
  }

  iniciar_soket() {
    console.log("iniciar web socket");
    this.obtener_notificacion().subscribe(notificacion => {

    });
  }
*/
}
