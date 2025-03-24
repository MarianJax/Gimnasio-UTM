import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableEjerciciosComponent } from '../../../components/ejercicios/table-ejercicios/table-ejercicios.component';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss']
})
export class EjerciciosComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { route: '/admin/rutinas', label: 'Rutinas' }, { label: 'Ejercicios' }];
  }

  @ViewChild(TableEjerciciosComponent) tableEjercicio!: TableEjerciciosComponent;

  obtenerDatos() {
    if (this.tableEjercicio) {
      this.tableEjercicio.obtenerDatos(); // Llama al método de actualización de la tabla
    }
  }

}

