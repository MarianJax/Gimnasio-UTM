import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl = 'http://localhost:3000/carrera';

  constructor(private http: HttpClient) { }

  obtenerCarreras(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerCarrerasPorFacultad(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/facultad/${id}`);
  }
}
