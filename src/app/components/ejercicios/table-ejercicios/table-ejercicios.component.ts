import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { EjerciciosService } from '../../../service/ejercicio/ejercicios.service';
import { EquiposService } from '../../../service/equipo/equipo.service';
import { RutinasService } from '../../../service/rutinas/rutinas.service';
import { Table } from 'primeng/table';

interface Options {
  name: string,
  code: string
}

const resetForm = {
  id: null,
  maquinas: null,
  rutinas: null,
  nombre: null,
  nivel: null,
  series: null,
  repeticiones: null,
  descanso: null,
  descripcion: null,
}

@Component({
  selector: 'app-table-ejercicios',
  templateUrl: './table-ejercicios.component.html',
  styleUrls: ['./table-ejercicios.component.scss']
})
export class TableEjerciciosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  updatedEjercicioForm: FormGroup;
  visible: boolean = false;
  rutina: any = undefined;
  ejercicios: any;

  Niveles = [
    { name: 'Principiante', value: 'Principiante' },
    { name: 'Intermedio', value: 'Intermedio' },
    { name: 'Avanzado', value: 'Avanzado' }
  ]

  async showDialog(id: string) {
    const ejercicio = await this.ejerciciosService.obtenerEjercicio(id).toPromise();

    this.updatedEjercicioForm.patchValue({
      id: ejercicio?.id ?? null,
      maquinas: ejercicio?.maquinas.map((maquina: { nombre: string, id: string }) => ({ name: maquina.nombre, code: maquina.id })) ?? null,
      rutinas: ejercicio?.rutinas.map((rutina: { nombre: string, id: string }) => ({ name: rutina.nombre, code: rutina.id })) ?? null,
      nombre: ejercicio?.nombre ?? null,
      nivel: this.Niveles.find((nivel) => nivel.name === ejercicio?.nivel) ?? null,
      series: ejercicio?.series ?? null,
      repeticiones: ejercicio?.repeticiones ?? null,
      descanso: ejercicio?.descanso ?? null,
      descripcion: ejercicio?.descripcion ?? null
    });
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
    this.updatedEjercicioForm.reset(resetForm);
  }

  items: MenuItem[] | undefined;

  maquinas: Options[] = [];

  rutinas: Options[] = [];

  selectedMaquina: Options[] = [];
  selectedRutina: Options[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private equiposService: EquiposService,
    private ejerciciosService: EjerciciosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.updatedEjercicioForm = this.fb.group({
      id: new FormControl<string | null>(null),
      maquinas: new FormControl<string | null>(null),
      rutinas: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      nivel: new FormControl<string | null>(null),
      series: new FormControl<number | null>(null),
      repeticiones: new FormControl<number | null>(null),
      descanso: new FormControl<number | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.ejerciciosService.obtenerEjercicios().subscribe((data) => this.ejercicios = data);
    this.equiposService.obtenerDatos().subscribe((data) => { this.maquinas = data.map((maquina: { nombre: string, id: string }) => ({ name: maquina.nombre, code: maquina.id })) });
    this.rutinaService.obtenerRutinas().subscribe((data) => { this.rutinas = data.map((rutina: { nombre: string, id: string }) => ({ name: rutina.nombre, code: rutina.id })) });

  }

  getItemsAsString(items: { nombre: string; }[]) {
    return items?.map(role => role.nombre).join(', ') || 'Sin elemento asignado';
  }

  updatedEjercicio() {
    try {
      const { maquinas, rutinas, nivel, ...data } = this.updatedEjercicioForm.value;
      this.ejerciciosService.actualizarEjercicio({
        ...data,
        maquinas: maquinas ? this.selectedMaquina.map((maquina) => maquina.code) : null,
        rutinas: rutinas ? this.selectedRutina.map((rutina) => rutina.code) : null,
        nivel: nivel && nivel.value
      }).subscribe({
        next: () => {
          this.updatedEjercicioForm.reset();
          this.obtenerDatos();
          this.visible = false;
        },
        error: (err) => {
          console.log('Error al enviar los datos', err, err.error.errors);
          this.updatedEjercicioForm.setErrors(err.error.errors);
        },
      });
    } catch (error) {
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

  confirm(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Ejercicio',
      message: 'El ejercicio se eliminará de forma permanente',
      accept: () => {
        this.ejerciciosService.eliminarEjercicio(id).subscribe({
          next: () => {
            this.obtenerDatos();
            this.messageService.add({ severity: 'success', summary: 'Ejercicio eliminado', detail: 'Ejercicio eliminado con éxito' });
          }
        });
      },
      reject: () => { }
    });
  }
}

