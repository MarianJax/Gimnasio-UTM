import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableMantenimientoComponent } from '../../../../components/mantenimientos/table-mantenimiento/table-mantenimiento.component';

export interface Mantenimiento {
  id: string;
  maquina: {
    nombre: string;
  };
  fecha_mantenimiento: string;
  estado: string;
  costo: number;
  observaciones: string;
}

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss'],
})
export class MantenimientoComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit() {

    this.items = [
      { icon: 'dashboard', route: '/admin', label: 'Inicio' },
      { label: 'Equipos', route: '/admin/equipos' },
      { label: 'Mantenimientos' },
    ];
  }

  @ViewChild(TableMantenimientoComponent) tablemantenimiento!: TableMantenimientoComponent;

  loadRutinas() {
    if (this.tablemantenimiento) {
      this.tablemantenimiento.loadMantenimientos(); // Llama al método de actualización de la tabla
    }
  }
}
