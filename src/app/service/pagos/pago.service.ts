import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:3000/pago';

  constructor(private http: HttpClient) { }

  obtenerPagos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  agregarPago(pago: any): Observable<any> {
    return this.http.post(this.apiUrl, pago);
  }
  obtenerPago(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  actualizarPago(pago: any):
    Observable<any> {
    return this.http.patch(`${this.apiUrl}/${pago.id}`, pago);
  }

  eliminarPago(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
