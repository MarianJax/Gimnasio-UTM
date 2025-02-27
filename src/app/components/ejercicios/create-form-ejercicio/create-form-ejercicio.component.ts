import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Estados } from '../../agendamientos/create-form/agendamiento-info/agendamiento-info.component';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-create-form-ejercicio',
  templateUrl: './create-form-ejercicio.component.html',
  styleUrls: ['./create-form-ejercicio.component.scss']
})
export class CreateFormEjercicioComponent implements OnInit {
  ejercicioForm: FormGroup;

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

  filteredEquipos: any[] = [];

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(private fb: FormBuilder) {
    this.ejercicioForm = this.fb.group({
      maquina_id: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      nivel: new FormControl<string | null>(null),
      series: new FormControl<number | null>(null),
      repeticiones: new FormControl<number | null>(null),
      descanso: new FormControl<number | null>(null),
      observaciones: new FormControl<string | null>(null),      
    });
  }

  ngOnInit() { }

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
