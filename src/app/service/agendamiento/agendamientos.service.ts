import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendamientosService {
  private apiUrl = 'http://localhost:3000/agendamiento';
  constructor(private http: HttpClient) {}

  obtenerAgendamientosWithPendingValidation(take?: number, skip?: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/with-pending-validation?${take ? `_limit=${take}` : ''}${skip ? `&_all=${skip}` : false}`);
  }

  obtenerAgendamientos(fecha?: string): Observable<any> {
    return this.http.get(this.apiUrl + (fecha ? `?_fecha=${fecha}` : ''));
  }

  actualizarAgendamiento(id: string, agendamiento: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, agendamiento);
  }

  obtenerAgendamientosPorUsuario(id: string, fecha: Date): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${id}?_fecha=${fecha.toISOString()}`);
  }

  crearAgendamiento(agendamiento: any): Observable<any> {
    return this.http.post(this.apiUrl, agendamiento);
  }

  obtenerAgendamientosPorFecha(fecha: Date): Observable<any> {
    return this.http.get(`${this.apiUrl}/for-date?_fecha=${fecha.toISOString()}`);
  }

  agregarAgendamientoMembresia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/membresia`, data);
  }
}

