import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EquiposService } from '../../../service/equipo/equipo.service';
import { MenuItem } from 'primeng/api';

export interface Estados {
  name: string;
  code: string;
}

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {
items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  constructor(
    private equipoService: EquiposService,
    private fb: FormBuilder,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  maquinas = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
    this.items = [
      { icon: 'dashboard', route: '/admin', label: 'Inicio' },
      { label: 'Equipos' },
    ];
  }

  goToMantenimiento() {
    this.router.navigate(['/admin/equipos/mantenimiento']);
  }

  AddMaquina() {
    this.router.navigate(['/admin/equipos/registrar']);
  }

  obtenerDatos() {
    this.equipoService
      .obtenerDatos()
      .subscribe((data) => (this.maquinas = data));
  }
}
