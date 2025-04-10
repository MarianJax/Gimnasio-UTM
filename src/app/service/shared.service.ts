import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private parametroSubject = new BehaviorSubject<string | null>(null);
  parametro$ = this.parametroSubject.asObservable();

  setParametro(valor: string) {
    this.parametroSubject.next(valor);
  }

  getParametro() {
    return this.parametroSubject.value;
  }
}
