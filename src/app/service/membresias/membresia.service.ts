import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  private apiUrl = 'http://localhost:3000 membresias';

  constructor(private http: HttpClient) { }
  obtenerMembresias(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  agregarMembresia(membresia: any): Observable<any> {
    return this.http.post(this.apiUrl, membresia);
  }
  obtenerMembresia(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  actualizarMembresia(membresia: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${membresia.id}`, membresia);
  }
}
