import { Component } from '@angular/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent {
  cuentaAhorros: string = '';
  metodoPago: string = 'Diario';
  fechaPago: string = '';
  monto: number = 0.5;
  evidenciaPago: string = '';
}
