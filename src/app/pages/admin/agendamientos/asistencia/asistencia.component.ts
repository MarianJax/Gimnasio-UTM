import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Reservas', route: '/admin/agendamientos' }, { label: 'Asistencia' }];  
  }

}
