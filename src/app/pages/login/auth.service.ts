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
    //console.log('Desde el Service ->', data);
    return this.http.post<any>(this.apiUrl, data);
  }
}
