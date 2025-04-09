import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/reports';
  constructor(private http: HttpClient) { }

  obtenerResumenAgendamientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
