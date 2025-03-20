import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EjerciciosService } from '../../../service/ejercicio/ejercicios.service';
import { EquiposService } from '../../../service/equipo/equipo.service';
import { RutinasService } from '../../../service/rutinas/rutinas.service';

const resetForm = {
  id: new FormControl<string | null>(null),
  maquinas: new FormControl<string | null>(null),
  rutinas: new FormControl<string | null>(null),
  nombre: new FormControl<string | null>(null),
  nivel: new FormControl<string | null>(null),
  series: new FormControl<number | null>(null),
  repeticiones: new FormControl<number | null>(null),
  descanso: new FormControl<number | null>(null),
  descripcion: new FormControl<string | null>(null),
}

@Component({
  selector: 'app-table-ejercicios',
  templateUrl: './table-ejercicios.component.html',
  styleUrls: ['./table-ejercicios.component.scss']
})
export class TableEjerciciosComponent implements OnInit {
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

    console.log(ejercicio);

    this.updatedEjercicioForm.patchValue({
      id: ejercicio?.id ?? null,
      maquinas: ejercicio?.maquinas ?? null,
      rutinas: ejercicio?.rutinas ?? null,
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

  maquinas: {
    nombre: string;
    id: string;
  }[] = [];

  rutinas: {
    nombre: string;
    id: string;
  }[] = [];

  filteredMaquinas: any[] = [];
  filteredRutinas: any[] = [];
  selectedMaquina: any[] = [];
  selectedRutina: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private equiposService: EquiposService,
    private ejerciciosService: EjerciciosService
  ) {
    this.updatedEjercicioForm = this.fb.group(resetForm);
  }

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.equiposService.obtenerDatos().subscribe((data) => this.maquinas = data);
    this.rutinaService.obtenerRutinas().subscribe((data) => this.rutinas = data);
    this.ejerciciosService.obtenerEjercicios().subscribe((data) => this.ejercicios = data);
  }

  filterMaquinas(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.maquinas as any[]).length; i++) {
      let maquina = (this.maquinas as { id: string; nombre: string }[])[i];

      const isAlreadySelected = this.selectedMaquina.find((selected) => selected.id === maquina.id);

      if (!isAlreadySelected && maquina.nombre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(maquina);
      }
    }

    this.filteredMaquinas = filtered;
  }

  filterRutinas(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.rutinas as any[]).length; i++) {
      let rutina = (this.rutinas as { id: string; nombre: string }[])[i];

      const isAlreadySelected = this.selectedRutina.find((selected) => selected.id === rutina.id);

      if (!isAlreadySelected && rutina.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(rutina);
      }
    }

    this.filteredRutinas = filtered;
  }

  getItemsAsString(items: { nombre: string; }[]) {
    return items?.map(role => role.nombre).join(', ') || 'Sin elemento asignado';
  }

  updatedEjercicio() {
    try {
      const { maquinas, rutinas, nivel, ...data } = this.updatedEjercicioForm.value;
      this.ejerciciosService.actualizarEjercicio({
        ...data,
        maquinas: maquinas ? this.selectedMaquina.map((maquina) => maquina.id) : null,
        rutinas: rutinas ? this.selectedRutina.map((rutina) => rutina.id) : null,
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
}

