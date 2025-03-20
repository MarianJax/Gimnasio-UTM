import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableUsuarioComponent } from '../../../components/usuario/table-usuario/table-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Usuarios' }];
  }

  @ViewChild(TableUsuarioComponent) tableUsuario!: TableUsuarioComponent;

  obtenerDatos() {
    if (this.tableUsuario) {
      this.tableUsuario.obtenerDatos(); // Llama al método de actualización de la tabla
    }
  }

}
