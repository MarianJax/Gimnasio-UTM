import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-table-ejercicios',
  templateUrl: './table-ejercicios.component.html',
  styleUrls: ['./table-ejercicios.component.scss']
})
export class TableEjerciciosComponent implements OnInit {
  updatedEjercicioForm: FormGroup;
  visible: boolean = false;
  rutina: any = undefined;

  Niveles = [
    { name: 'Principiante', value: 'Principiante' },
    { name: 'Intermedio', value: 'Intermedio' },
    { name: 'Avanzado', value: 'Avanzado' }
  ]

  showDialog(id: string) {
    this.visible = true;

    this.rutina = this.maquinas.find((rutina: { id: string; }) => rutina.id === id);
    this.updatedEjercicioForm.patchValue({
      maquina_id: this.rutina.maquina,
      nombre: this.rutina.nombre,
      nivel: this.Niveles.find((nivel) => nivel.name === this.rutina.nivel),
      series: this.rutina.series,
      repeticiones: this.rutina.repeticiones,
      descanso: this.rutina.descanso,
      observaciones: this.rutina.observaciones
    });

  }

  closedDialog() {
    this.visible = false;
    this.updatedEjercicioForm.reset();
  }

  items: MenuItem[] | undefined;

  maquinas: any = [];

  filteredEquipos: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updatedEjercicioForm = this.fb.group({
      maquina_id: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      nivel: new FormControl<string | null>(null),
      series: new FormControl<number | null>(null),
      repeticiones: new FormControl<number | null>(null),
      descanso: new FormControl<number | null>(null),
      observaciones: new FormControl<string | null>(null),      
    });
   }

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  goToMantenimiento() {
    this.router.navigate(['/admin/equipos/mantenimiento']);
  }

  AddMaquina() {
    this.router.navigate(['/admin/equipos/registrar']);
  }

  obtenerDatos() {
    this.maquinas = [
      {
        id: 1,
        nombre: 'Bicicleta',
        ejercicio: 'Cardio',
        maquina: 'Bicicleta',
        series: 3,
        repeticiones: 15
      },
      {
        id: 2,
        nombre: 'Cinta',
        ejercicio: 'Cardio',
        maquina: 'Cinta',
        series: 3,
        repeticiones: 15
      },
      {
        id: 3,
        nombre: 'Press de banca',
        ejercicio: 'Pecho',
        maquina: 'Press de banca',
        series: 3,
        repeticiones: 15
      },
      {
        id: 4,
        nombre: 'Prensa',
        ejercicio: 'Piernas',
        maquina: 'Prensa',
        series: 3,
        repeticiones: 15
      },
      {
        id: 5,
        nombre: 'Polea',
        ejercicio: 'Espalda',
        maquina: 'Polea',
        series: 3,
        repeticiones: 15
      }
    ];
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
}

