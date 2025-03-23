import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosEntrenadoresService {
  private apiUrl = 'http://localhost:3000/horario-empleado';

  constructor(private http: HttpClient) { }
  obtenerHorarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  agregarHorario(horario: any): Observable<any> {
    return this.http.post(this.apiUrl, horario);
  }

  obtenerhorario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarHorario({ id, ...horario }: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, horario);
  }

  eliminarHorario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
