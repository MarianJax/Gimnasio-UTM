import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {
private apiUrl = 'http://localhost:3000/mantenimiento';

  constructor(private http: HttpClient) { }
  obtenerMantenimientos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  agregarMantenimiento(mantenimiento: any): Observable<any> {
    return this.http.post(this.apiUrl, mantenimiento);
  }

  obtenerMantenimiento(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarMantenimiento({ id, ...mantenimiento }: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, mantenimiento);
  }

  eliminarMantenimiento(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  obtenerHistorialMaquina(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/maquina/${id}`);
  }
}
