import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoPago } from '../../components/agendamientos/table-agendamientos/type';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesPagosService {

  private apiUrl = 'http://localhost:3000/validaciones-pago';
  constructor(private http: HttpClient) { }

  obtenerValidaciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  agregarValidacion(validacion: any): Observable<any> {
    return this.http.post(this.apiUrl, validacion);
  }

  obtenerValidacion(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarValidacion(id: string, validacion: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, validacion);
  }
}
