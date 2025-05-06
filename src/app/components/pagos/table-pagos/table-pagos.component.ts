import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../../service/pagos/pago.service';
import { Pagos } from './type';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-table-pagos',
  templateUrl: './table-pagos.component.html',
  styleUrls: ['./table-pagos.component.scss']
})
export class TablePagosComponent implements OnInit {
  pagos!: Pagos[];

  ngOnInit(): void { this.loadPagos(); }

  constructor(private pagoService: PagoService, private messageService: MessageService) { }

  loadPagos() {
    this.pagoService.obtenerPagos().subscribe((data: any[]) => this.pagos = data.map(item => {
      
    return {
      id: item.id,
      estado: item.validacion_pago[0].estado,
      monto: item.monto,
      fecha_pago: item.fecha_pago,
      metodo_pago: item.metodo_pago,
      usuario_id: item.validacion_pago[0].usuario_id,
      rol: item.agendamiento.length > 0 ? item.agendamiento[0].distribucion.rol_id : item.membresia[0].agendamientos[0].distribucion.rol_id,
    }
    }));
  }

  eliminar(id: string) {
    this.pagoService.eliminarPago(id).subscribe({
      next: ({ status, message }: any) => {
        if (status) {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: message });
          this.loadPagos();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el pago' });
      }
    });
  }

}
