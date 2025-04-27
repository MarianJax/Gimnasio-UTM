import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableTarifasComponent } from '../../../components/tarifas/table-tarifas/table-tarifas.component';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})
export class TarifasComponent  implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Tarifas y cupos' }];
  }
 
  @ViewChild(TableTarifasComponent) tableRol!: TableTarifasComponent;

  obtenerDatos() {
    if (this.tableRol) {
      this.tableRol.loadRoles(); // Llama al método de actualización de la tabla
    }
  }

}
