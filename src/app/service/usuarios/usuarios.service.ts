import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuario';
  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  agregarUsuario(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  obtenerUsuario(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario({ id, ...data }: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

}
