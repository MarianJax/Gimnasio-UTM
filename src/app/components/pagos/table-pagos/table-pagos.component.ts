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
    this.pagoService.obtenerPagos().subscribe((data: any[]) => this.pagos = data.map(item => {
      
    return {
      id: item.id,
      monto: item.monto,
      fecha_pago: item.fecha_pago,
      metodo_pago: item.metodo_pago,
      usuario_id: item.validacion_pago[0].usuario_id,
      rol: item.agendamiento.length > 0 ? item.agendamiento[0].distribucion.rol_id : item.membresia[0].agendamientos[0].distribucion.rol_id,
    }
    }));
  }

}
