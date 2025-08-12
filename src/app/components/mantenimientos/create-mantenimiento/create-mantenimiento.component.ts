import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Estados } from '../../../pages/admin/equipos/equipos.component';
import { EquiposService } from '../../../service/equipo/equipo.service';
import { MantenimientosService } from '../../../service/mantenimiento/mantenimientos.service';

export interface Mantenimiento {
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
  selector: 'app-create-mantenimiento',
  templateUrl: './create-mantenimiento.component.html',
  styleUrls: ['./create-mantenimiento.component.scss']
})
export class CreateMantenimientoComponent implements OnInit {
  mantenimientoForm: FormGroup;
  items: MenuItem[] | undefined;
  @Output() addedMantenimiento = new EventEmitter<void>();

  maquinas: {
    name: string;
    code: string;
  }[] = [];

  selectedMaquina: { name: string; code: string }[] = [];

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
    private mantenimientoService: MantenimientosService,
    private fb: FormBuilder,
    private messageService: MessageService
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
      .subscribe((data: { id: string, nombre: string }[]) => {
        this.maquinas = data.map((maquina) => ({
          name: maquina.nombre,
          code: maquina.id,
        }));
      });
  }

  obtenerMantenimientos() {
    this.mantenimientoService
      .obtenerMantenimientos()
      .subscribe((data) => (this.mantenimientos = data));
  }

  openDialog() {
    this.mantenimientoDialog = true;
  }

  hideDialog() {
    this.mantenimientoDialog = false;
  }

  addMantenimiento() {
    try {
      const newMaquina = this.mantenimientoForm.value;
      this.mantenimientoService
        .agregarMantenimiento({
          costo: newMaquina.costo,
          estado: newMaquina.estado && newMaquina.estado.code,
          maquina_id: newMaquina.maquina_id && newMaquina.maquina_id.code,
          fecha_mantenimiento:
            newMaquina.fecha_mantenimiento &&
            new Date(newMaquina.fecha_mantenimiento).toISOString(),
          observaciones: newMaquina.observaciones,
        })
        .subscribe({
          next: () => {
            this.mantenimientoForm.reset({
              costo: null,
              estado: null,
              maquina_id: null,
              fecha_mantenimiento: null,
              observaciones: null,
            });
            this.addedMantenimiento.emit();
            this.messageService.add({ severity: 'success', summary: 'Equipo Registrado', detail: 'Equipo Registrado ' });
            this.hideDialog();
          },
          error: (error: any) => {
            console.error('Error al enviar los datos', error.error.errors);
            this.mantenimientoForm.setErrors(error.error.errors);
          },
        });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el registro' });
      console.error('Error al enviar los datos', error);
    }
  }
}
