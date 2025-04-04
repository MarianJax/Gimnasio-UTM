import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
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
  selector: 'app-table-mantenimiento',
  templateUrl: './table-mantenimiento.component.html',
  styleUrls: ['./table-mantenimiento.component.scss']
})
export class TableMantenimientoComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  mantenimientoForm: FormGroup;
  mantenimientos!: Mantenimiento[];
  visible: boolean = false;

  maquinas: {
    name: string;
    code: string;
  }[] = [];

  estadosOpt = [
    { name: 'En proceso', code: 'En proceso' },
    { name: 'Pendiente', code: 'Pendiente' },
    { name: 'Finalizado', code: 'Finalizado' },
  ];

  selectedestado: any;

  constructor(
    private equipoService: EquiposService,
    private mantenimientoService: MantenimientosService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.mantenimientoForm = this.fb.group({
      id: new FormControl<string | null>(null),
      costo: new FormControl<number | null>(null),
      estado: new FormControl<Estados | null>(null),
      maquina_id: new FormControl<string | null>(null),
      fecha_mantenimiento: new FormControl<Date | null>(null),
      observaciones: new FormControl<string | null>(null),
    });
  }

  ngOnInit() {
    this.loadMantenimientos();
    this.equipoService
      .obtenerDatos()
      .subscribe((data: { id: string, nombre: string }[]) => {
        this.maquinas = data.map((maquina) => ({
          name: maquina.nombre,
          code: maquina.id,
        }));
      });
  }

  loadMantenimientos() {
    this.mantenimientoService
      .obtenerMantenimientos()
      .subscribe((data: Mantenimiento[]) => {
        this.mantenimientos = data;
      });
  }

  openDialog(id: string) {
    this.mantenimientoService.obtenerMantenimiento(id)
      .subscribe({
        next: (data: Mantenimiento) => {
          console.log(data);
          this.mantenimientoForm.patchValue({
            id: data.id,
            costo: Number(data.costo),
            estado: this.estadosOpt.find((estado) => estado.code === data.estado),
            maquina_id: this.maquinas.find((maquina) => maquina.name === data.maquina.nombre),
            fecha_mantenimiento: new Date(data.fecha_mantenimiento),
            observaciones: data.observaciones,
          });
          this.visible = true;
        },
        error: (error) => {
          console.log('Error al obtener los datos', error);
        },
      });
  }

  hideDialog() {
    this.visible = false;
  }

  updated() {
    try {
      const upMantenimiento = this.mantenimientoForm.value;
      console.log({
        costo: upMantenimiento.costo,
        estado: upMantenimiento.estado && upMantenimiento.estado.code,
        maquina_id: upMantenimiento.maquina_id && upMantenimiento.maquina_id.code,
        fecha_mantenimiento:
          upMantenimiento.fecha_mantenimiento &&
          new Date(upMantenimiento.fecha_mantenimiento).toISOString(),
        observaciones: upMantenimiento.observaciones,
      });
      this.mantenimientoService
        .actualizarMantenimiento({
          id: upMantenimiento.id,
          costo: upMantenimiento.costo,
          estado: upMantenimiento.estado && upMantenimiento.estado.code,
          maquina_id: upMantenimiento.maquina_id && upMantenimiento.maquina_id.code,
          fecha_mantenimiento:
            upMantenimiento.fecha_mantenimiento &&
            new Date(upMantenimiento.fecha_mantenimiento).toISOString(),
          observaciones: upMantenimiento.observaciones,
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
            this.messageService.add({ severity: 'success', summary: 'Ejercicio actualizado', detail: 'Ejercicio actualizado con éxito' });
            this.loadMantenimientos();
            this.hideDialog();
          },
          error: (error) => {

            console.log('Error al enviar los datos', error.error.errors);
            this.mantenimientoForm.setErrors(error.error.errors);
          },
        });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar los datos' });
      console.log('Error al enviar los datos', error);
    }
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = '';  // Limpia el input
    if (this.dt) {
      this.dt.clear();  // Limpia los filtros de la tabla
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Finalizado':
        return 'success';

      case 'En proceso':
        return 'warning';

      case 'Pendiente':
        return 'danger';
      default:
        return 'secondary';
    }
  }

}
