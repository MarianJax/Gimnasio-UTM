import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private apiUrl = 'http://localhost:3000/institucion';

  constructor(private http: HttpClient) { }
  obtenerDatosInstitucion(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
