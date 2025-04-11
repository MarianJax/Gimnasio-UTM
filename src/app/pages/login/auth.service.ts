import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient) { }
  autenticar(data: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  isAuthenticated(): boolean {
    const session = sessionStorage.getItem('session-usuario');
    return !!session;
  }

  getUserData(): any {
    const session = sessionStorage.getItem('session-usuario');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }
}
