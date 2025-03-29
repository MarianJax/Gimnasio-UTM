import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../../service/pagos/pago.service';

interface Pago {
  id?: string;
  code?: string;
  name?: string;
  cedula?: string;
  rol?: string;
  tipoMembresia?: string;
  fecha?: string;
  inventoryStatus?: string;
  precio?: number;
}

@Component({
  selector: 'app-table-pagos',
  templateUrl: './table-pagos.component.html',
  styleUrls: ['./table-pagos.component.scss']
})
export class TablePagosComponent implements OnInit {
  pagos: Pago[] = [];

  ngOnInit(): void { this.loadPagos(); }

  constructor(private pagoService: PagoService) { }

  loadPagos() {
    this.pagoService.obtenerPagos().then((data: Pago[]) => this.pagos = data);
  }

}
