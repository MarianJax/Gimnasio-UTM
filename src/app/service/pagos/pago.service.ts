import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:3000/pagos';

  constructor(private http: HttpClient) { }
  
  obtenerPagos(): any{
    return this.http.get(this.apiUrl);
  }
  agregarPago(pago: any): any {
    return this.http.post(this.apiUrl, pago);
  }
  obtenerPago(id: string): any {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  actualizarPago(pago: any): 
    Observable<any> {
    return this.http.patch(`${this.apiUrl}/${pago.id}`, pago);
  }
}
