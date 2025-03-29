import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-agendamientos',
  templateUrl: './agendamientos.component.html',
  styleUrls: ['./agendamientos.component.scss']
})
export class AgendamientosComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Reservas' }];
  }

}
