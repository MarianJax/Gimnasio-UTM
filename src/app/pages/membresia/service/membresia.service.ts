import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembresiaService {
  private apiUrl = 'http://localhost:3000/membresia';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createMembresia(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
