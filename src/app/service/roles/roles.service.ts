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

}
