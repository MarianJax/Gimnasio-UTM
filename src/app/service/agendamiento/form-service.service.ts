import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  // Datos de agendamiento
  private agendamientoData = new BehaviorSubject<any>({})
  agendamientoData$ = this.agendamientoData.asObservable()

  // Datos de pago
  private pagoData = new BehaviorSubject<any>({})
  pagoData$ = this.pagoData.asObservable()

  // Flag para evitar actualizaciones cíclicas
  private updatingFromService = false

  constructor() { }

  // Actualizar datos de agendamiento
  updateAgendamientoData(data: any): void {
    if (!this.updatingFromService) {
      this.updatingFromService = true;
      this.agendamientoData.next(data);
      setTimeout(() => this.updatingFromService = false, 100);
    }
  }

  // Actualizar datos de pago
  updatePagoData(data: any): void {
    if (!this.updatingFromService) {
      this.pagoData.next(data)
    }
  }

  // Obtener todos los datos combinados
  getAllFormData(): any {
    return {
      agendamiento: this.agendamientoData.value,
      pago: this.pagoData.value,
    }
  }

  // Limpiar todos los datos
  clearAllData(): void {
    this.agendamientoData.next({})
    this.pagoData.next({})
  }

  // Método para establecer el flag de actualización
  setUpdatingFlag(value: boolean): void {
    this.updatingFromService = value
  }
}
