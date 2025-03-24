import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TableRutinaComponent } from '../../../components/rutina/table-rutina/table-rutina.component';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})
export class RutinasComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Rutinas' }];
  }

  @ViewChild(TableRutinaComponent) tableRutina!: TableRutinaComponent;

  loadRutinas() {
    if (this.tableRutina) {
      this.tableRutina.obtenerDatos(); // Llama al método de actualización de la tabla
    }
  }

  goToEjercicios() {
    this.router.navigate(['/admin/ejercicios']);
  }

}
