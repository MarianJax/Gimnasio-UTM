import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-rutina-detalle',
  templateUrl: './rutina-detalle.component.html',
  styleUrls: ['./rutina-detalle.component.scss']
})
export class RutinaDetalleComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' },{ route: '/admin/rutinas', label: 'Rutinas' }, { label: 'Detalles' }];
  }

}

