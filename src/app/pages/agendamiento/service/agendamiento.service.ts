import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendamientoService {
  private apiUrl = 'http://localhost:3000/membresia';
  constructor(private http: HttpClient) {}
  createAgendamiento(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
