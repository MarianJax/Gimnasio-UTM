import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
private apiUrl = 'http://localhost:3000/ejercicios';
  constructor(private http: HttpClient) { }

  obtenerEjercicios(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  agregarEjercicio(ejercicio: any): Observable<any> {
    return this.http.post(this.apiUrl, ejercicio);
  }

  obtenerEjercicio(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarEjercicio(ejercicio: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${ejercicio.id}`, ejercicio);
  }

}
