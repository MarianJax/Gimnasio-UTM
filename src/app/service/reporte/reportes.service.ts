import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/reports';
  constructor(private http: HttpClient) { }

  obtenerResumenAgendamientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  obtenerDatosAgendamientosGraficos(facultad?: string, carrera?: string, tipoPago?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/graphics?_facultad=${facultad ? facultad : ''}&_carrera=${carrera ? carrera : ''}&_tipoPago=${tipoPago ? tipoPago : ''}`);
  }
}
