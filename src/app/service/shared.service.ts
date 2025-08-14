import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private parametroSubject = new BehaviorSubject<{valor:string, min:Date,max:Date}>({valor:'', min:new Date(), max:new Date()});
  parametro$ = this.parametroSubject.asObservable();

  setParametro({valor, min, max}:{valor:string, min:Date,max:Date}) {
    this.parametroSubject.next({valor, min, max});
  }

  getParametro() {
    return this.parametroSubject.value;
  }
}
