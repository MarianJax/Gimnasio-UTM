import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-create-form-rutina',
  templateUrl: './create-form-rutina.component.html',
  styleUrls: ['./create-form-rutina.component.scss']
})
export class CreateFormRutinaComponent implements OnInit {
  rutinaForm: FormGroup;

  Intensidad = [
    { name: 'Alto', value: 'alto' },
    { name: 'Medio', value: 'medio' },
    { name: 'Bajo', value: 'bajo' }
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
    this.rutinaForm = this.fb.group({
      nombre: new FormControl<string | null>(null),
      intensidad: new FormControl<string | null>(null),
      descripcion: new FormControl<string | null>(null),      
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

