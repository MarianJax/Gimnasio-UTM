import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../pagos/pago.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

interface Pago {
  id: string;
  maquina: string;
  fecha: string;
  estado: string;
  pago: number;
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

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pagos = [
      {
        id: '1000',
        maquina: 'Maquina 1',
        fecha: '2023-01-01',
        estado: 'Mantenimiento',
        pago: 3.50
      }
    ];
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Equipos', route: '/admin/equipos' }, { label: 'Mantenimientos' }];

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

