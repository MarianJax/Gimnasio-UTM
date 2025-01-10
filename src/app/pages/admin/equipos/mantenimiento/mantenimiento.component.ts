import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../pagos/pago.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

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
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  pagos!: Pago[];

  pago!: Pago;

  selectedPagos!: Pago[] | null;


  mantenimientoDialog: boolean = false;

  constructor(private pagoService: PagoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pagoService.getPagos().then((data) => (this.pagos = data));
    this.items = [{ icon: 'dashboard', route: '/admin' }, { label: 'Pagos' }];

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.pagos.length; i++) {
      if (this.pagos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }


  addMantenimiento() {
    console.log('Clic', this.mantenimientoDialog);
    this.mantenimientoDialog = true;
  }

  hideDialog() {
    this.mantenimientoDialog = false;
  }

}

