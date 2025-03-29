import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableUsuarioComponent } from '../../../../components/usuario/table-usuario/table-usuario.component';
import { TableRolesComponent } from '../../../../components/roles/table-roles/table-roles.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent  implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Usuarios', route: '/admin/usuarios' }, { label: 'Roles' }];
  }
 
  @ViewChild(TableRolesComponent) tableRol!: TableRolesComponent;

  obtenerDatos() {
    if (this.tableRol) {
      this.tableRol.loadRoles(); // Llama al método de actualización de la tabla
    }
  }

}
