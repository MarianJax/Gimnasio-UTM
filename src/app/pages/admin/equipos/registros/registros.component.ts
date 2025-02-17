import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

interface Equipos {
  id: string;
  nombre: string;
  fecha: string;
  estado: string;
  cantidad: number;
}

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Equipos', route: '/admin/equipos' }, { label: 'Registros' }];

  }
}
