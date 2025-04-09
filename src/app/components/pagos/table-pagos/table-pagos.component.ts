import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../../service/pagos/pago.service';
import { Pagos } from './type';

@Component({
  selector: 'app-table-pagos',
  templateUrl: './table-pagos.component.html',
  styleUrls: ['./table-pagos.component.scss']
})
export class TablePagosComponent implements OnInit {
  pagos!: Pagos[];

  ngOnInit(): void { this.loadPagos(); }

  constructor(private pagoService: PagoService) { }

  loadPagos() {
    this.pagoService.obtenerPagos().subscribe((data: any[]) => this.pagos = data.map(item => ({
      id: item.id,
      monto: item.monto,
      fecha_pago: item.fecha_pago,
      metodo_pago: item.metodo_pago,
      user: item.validacion_pago[0]?.users ? {
        id: item.validacion_pago[0].users.id,
        nombre: item.validacion_pago[0].users.nombre,
        apellido: item.validacion_pago[0].users.apellido,
        cedula: item.validacion_pago[0].users.cedula,
        rol: item.validacion_pago[0].users.roles[0]?.nombre // Extraemos el primer rol
      } : null
    })));
  }

}
