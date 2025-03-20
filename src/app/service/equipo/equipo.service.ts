import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquiposService {
  private apiUrl = 'http://localhost:3000/maquina';
  constructor(private http: HttpClient) {}
  enviarDatos(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  obtenerDatos() :Observable<any>{
    return this.http.get<any>(this.apiUrl,)
  }
}
