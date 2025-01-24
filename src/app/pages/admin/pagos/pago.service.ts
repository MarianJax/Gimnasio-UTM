import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  getPagosData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Marian Parrales',
        cedula: '5684236526',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-01-01',
        inventoryStatus: 'INSTOCK',
        precio: 3.50
      }
    ];
  }

  getPagos() {
    return Promise.resolve(this.getPagosData());
}
}
