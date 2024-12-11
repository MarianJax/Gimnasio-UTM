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
  
  get_roles(datos: any): Observable<any> {
    return this.http.post(this.url_siga + 'get_roles', datos, { headers: this.headers });
  }

  // FIN DASHBOARD

  enviarCorreoElectronico(datos: any): Observable<any> {
    return this.http.post(this.url_sipa + 'enviar-correo', datos);
  }
  claveGenerada: any;

  //CERRAR SESION 
  logout() {
    localStorage.removeItem(this.eventos._AUTH_TOKEN);
    sessionStorage.removeItem(this.eventos._DATOS_GENERALES_LOGIN);
    sessionStorage.removeItem(this.eventos._DATOS_REGISTRO_NACIONAL);
    sessionStorage.removeItem(this.eventos._MENU_DEFECTO);
  }

  consultar_usuario(cedula: any): Observable<any> {
    return this.http.get(this.url_sipa + "generales/consultar_usuario/" + cedula);
  }

  
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
