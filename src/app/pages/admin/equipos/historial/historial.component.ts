import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit() {

    this.items = [
      { icon: 'dashboard', route: '/admin', label: 'Inicio' },
      { label: 'Equipos', route: '/admin/equipos' },
      { label: 'Historial' },
    ];
  }

}
