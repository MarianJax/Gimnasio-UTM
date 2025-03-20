import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EquiposService } from '../../../service/equipo/equipo.service';
import { RutinasService } from '../../../service/rutinas/rutinas.service';
import { EjerciciosService } from '../../../service/ejercicio/ejercicios.service';

@Component({
  selector: 'app-create-form-ejercicio',
  templateUrl: './create-form-ejercicio.component.html',
  styleUrls: ['./create-form-ejercicio.component.scss']
})
export class CreateFormEjercicioComponent implements OnInit {
  ejercicioForm: FormGroup;
  visible: boolean = false;
  @Output() ejercicioAgregado = new EventEmitter<void>();

  showDialog() {
    console.log('Abre dialogo');
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
      this.rutinas = data;
    });
    this.equiposService.obtenerDatos().subscribe((data) => {
      this.maquinas = data;
    });
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

  addEjercicio() {
    try {
      const { maquinas, rutinas, nivel, ...data } = this.ejercicioForm.value;
      this.ejerciciosService.agregarEjercicio({
        ...data,
        maquinas: maquinas ? this.selectedMaquina.map((maquina) => maquina.id) : null,
        rutinas: rutinas ? this.selectedRutina.map((rutina) => rutina.id) : null,
        nivel: nivel && nivel.value
      }).subscribe({
        next: () => {
          this.ejercicioForm.reset();
          this.ejercicioAgregado.emit();
          this.visible = false;
        },
        error: (err) => {
          console.log('Error al enviar los datos', err.error.errors);
          this.ejercicioForm.setErrors(err.error.errors);
        },
      });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }
}
