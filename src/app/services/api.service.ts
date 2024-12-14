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

  // public url_siga = "https://app.utm.edu.ec:3000/";
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

  
}
