import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendamientosService {
  private apiUrl = 'http://localhost:3000/agendamiento';
  constructor(private http: HttpClient) {}

  obtenerAgendamientos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearAgendamiento(agendamiento: any): Observable<any> {
    return this.http.post(this.apiUrl, agendamiento);
  }


}

