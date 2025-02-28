import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient) { }
  autenticar(data: { email: string; password: string }): Observable<any> {
    //console.log('Desde el Service ->', data);
    return this.http.post<any>(this.apiUrl, {
      correo: data.email,
      contrasena: data.password
    });
  }
}
