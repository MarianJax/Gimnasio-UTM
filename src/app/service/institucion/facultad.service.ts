import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
private apiUrl = 'http://localhost:3000/facultad';

  constructor(private http: HttpClient) { }
  obtenerFacultades(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
