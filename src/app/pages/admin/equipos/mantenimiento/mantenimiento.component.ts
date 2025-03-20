import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Estados } from '../equipos.component';
import { MantenimientoService } from './mantenimiento.service';
import { EquiposService } from '../../../../service/equipo/equipo.service';

interface Mantenimiento {
  id: string;
  maquina: {
    nombre: string;
  };
  fecha_mantenimiento: string;
  estado: string;
  costo: number;
  observaciones: string;
}

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss'],
})
export class MantenimientoComponent implements OnInit {
  mantenimientoForm: FormGroup;
  items: MenuItem[] | undefined;

  maquinas: {
    nombre: string;
    id: string;
  }[] = [];

  filteredEquipos: any[] = [];

  estadosOpt = [
    { name: 'En proceso', code: 'En proceso' },
    { name: 'Pendiente', code: 'Pendiente' },
    { name: 'Finalizado', code: 'Finalizado' },
  ];

  selectedestado: any;

  home: MenuItem | undefined;

  mantenimientos!: Mantenimiento[];

  mantenimientoDialog: boolean = false;

  constructor(
    private equipoService: EquiposService,
    private mantenimientoService: MantenimientoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.mantenimientoForm = this.fb.group({
      costo: new FormControl<number | null>(null),
      estado: new FormControl<Estados | null>(null),
      maquina_id: new FormControl<string | null>(null),
      fecha_mantenimiento: new FormControl<Date | null>(null),
      observaciones: new FormControl<string | null>(null),
    });
  }

  ngOnInit() {
    this.obtenerMaquinas();
    this.obtenerMantenimientos();

    this.items = [
      { icon: 'dashboard', route: '/admin', label: 'Inicio' },
      { label: 'Equipos', route: '/admin/equipos' },
      { label: 'Mantenimientos' },
    ];
  }

  obtenerMaquinas() {
    this.equipoService
      .obtenerDatos()
      .subscribe((data) => (this.maquinas = data));
  }

  obtenerMantenimientos() {
    this.mantenimientoService
      .obtenerDatos()
      .subscribe((data) => (this.mantenimientos = data));
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.mantenimientos.length; i++) {
      if (this.mantenimientos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  openDialog() {
    this.mantenimientoDialog = true;
  }

  hideDialog() {
    this.mantenimientoDialog = false;
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.maquinas as any[]).length; i++) {
      let country = (this.maquinas as { id: string; nombre: string }[])[i];
      if (country.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredEquipos = filtered;
  }

  addMantenimiento() {
    try {
      const newMaquina = this.mantenimientoForm.value;
      console.log(newMaquina);
      this.mantenimientoService
        .enviarDatos({
          costo: newMaquina.costo,
          estado: newMaquina.estado && newMaquina.estado.code,
          maquina_id: newMaquina.maquina_id && newMaquina.maquina_id.id,
          fecha_mantenimiento:
            newMaquina.fecha_mantenimiento &&
            new Date(newMaquina.fecha_mantenimiento).toISOString(),
          observaciones: newMaquina.observaciones,
        })
        .subscribe({
          next: (response) => {
            this.mantenimientoForm.reset({
              costo: null,
              estado: null,
              maquina_id: null,
              fecha_mantenimiento: null,
              observaciones: null,
            });
            this.router.navigate(['admin/equipos/mantenimiento']);
            this.hideDialog();
          },
          error: (error) => {
            console.log('Error al enviar los datos', error.error.errors);
            this.mantenimientoForm.setErrors(error.error.errors);
          },
        });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }
}
