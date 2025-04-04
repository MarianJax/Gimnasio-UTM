import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'http://localhost:3000/rol';
  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  agregarRol(rol: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, rol);
  }

  obtenerRol(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  obtenerRolUsuario(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${id}`);
  }

  obtenerRolPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nombre/${nombre}`);
  }

  actualizarRol({ id, ...rol }: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, rol);
  }

  eliminarHorario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
