import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RutinasService {
  private apiUrl = 'http://localhost:3000/rutina';
  constructor(private http: HttpClient) {}

  obtenerRutinas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  agregarRutina(rutina: any): Observable<any> {
    return this.http.post(this.apiUrl, rutina);
  }

  obtenerRutinaActiva(): Observable<any> {
    return this.http.get(`${this.apiUrl}?status=true`);
  }

  obtenerRutina(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarRutina(rutina: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${rutina.id}`, rutina);
  }

  eliminarRutina(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
