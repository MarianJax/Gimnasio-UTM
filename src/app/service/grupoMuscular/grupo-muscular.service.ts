import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrupoMuscularService {
  private apiUrl = 'http://localhost:3000/grupo-muscular';
  constructor(private http: HttpClient) {}

  obtenerGruposMusculares(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  agregarGrupoMuscular(grupoMuscular: any): Observable<any> {
    return this.http.post(this.apiUrl, grupoMuscular);
  }

  obtenerGrupoMuscular(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarGrupoMuscular(rutina: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${rutina.id}`, rutina);
  }

  eliminarGrupoMuscular(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
