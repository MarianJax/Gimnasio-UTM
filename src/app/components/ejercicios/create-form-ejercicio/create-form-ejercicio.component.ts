import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EjerciciosService } from '../../../service/ejercicio/ejercicios.service';
import { EquiposService } from '../../../service/equipo/equipo.service';
import { RutinasService } from '../../../service/rutinas/rutinas.service';

interface Options {
  name: string,
  code: string
}

@Component({
  selector: 'app-create-form-ejercicio',
  templateUrl: './create-form-ejercicio.component.html',
  styleUrls: ['./create-form-ejercicio.component.scss']
})
export class CreateFormEjercicioComponent implements OnInit {
  ejercicioForm: FormGroup;
  visible: boolean = false;
  @Output() addedEjercicio = new EventEmitter<void>();

  showDialog() {
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
  }

  Niveles = [
    { name: 'Principiante', value: 'Principiante' },
    { name: 'Intermedio', value: 'Intermedio' },
    { name: 'Avanzado', value: 'Avanzado' }
  ]

  items: MenuItem[] | undefined;

  maquinas: Options[] = [];

  rutinas: Options[] = [];

  filteredMaquinas!: Options[];
  filteredRutinas!: Options[];
  selectedMaquina: Options[] = [];
  selectedRutina: Options[] = [];

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private equiposService: EquiposService,
    private ejerciciosService: EjerciciosService
  ) {
    this.ejercicioForm = this.fb.group({
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

  ngOnInit() {
    this.rutinaService.obtenerRutinas().subscribe((data) => {
      data.map((rutina: { nombre: string, id: string }) => {
        this.rutinas.push({ name: rutina.nombre, code: rutina.id });
      });
    });
    this.equiposService.obtenerDatos().subscribe((data) => {
      data.map((maquina: { nombre: string, id: string }) => {
        this.maquinas.push({ name: maquina.nombre, code: maquina.id });
      });
    });
  }

  filterMaquinas(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.maquinas as any[]).length; i++) {
      let maquina = (this.maquinas as { code: string; name: string }[])[i];

      const isAlreadySelected = this.selectedMaquina.find((selected) => selected.code === maquina.code);

      if (!isAlreadySelected && maquina.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(maquina);
      }
    }

    this.filteredMaquinas = filtered;
  }

  filterRutinas(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.rutinas as any[]).length; i++) {
      let rutina = (this.rutinas as { code: string; name: string }[])[i];

      const isAlreadySelected = this.selectedRutina.find((selected) => selected.code === rutina.code);

      if (!isAlreadySelected && rutina.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(rutina);
      }
    }

    this.filteredRutinas = filtered;
  }

  addEjercicio() {
    try {
      const data = this.ejercicioForm.value;
      this.ejerciciosService.agregarEjercicio({
        nombre: data.nombre,
        series: data.series,
        repeticiones: data.repeticiones,
        descanso: data.descanso,
        descripcion: data.descripcion,
        maquinas: data.maquinas ? this.selectedMaquina.map((maquina) => maquina.code) : null,
        rutinas: data.rutinas ? this.selectedRutina.map((rutina) => rutina.code) : null,
        nivel: data.nivel && data.nivel.value
      }).subscribe({
        next: () => {
          this.ejercicioForm.reset();
          this.addedEjercicio.emit();
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al enviar los datos', err);
          this.ejercicioForm.setErrors(err.error.errors);
        },
      });
    } catch (error) {
      console.error('Error al enviar los datos', error);
    }
  }
}
