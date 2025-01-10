import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss']
})
export class EjerciciosComponent implements OnInit {
  myGroup: FormGroup;

  filtrosRutinas: any[] = [];
  suggestions: any[] | undefined;
  isEmpty: boolean = false;

  // deberia ser un service de la base de datos
  rutinas = [
    {
      name: 'Pecho', code: 'pecho'
    },
    {
      name: 'Pierna', code: 'pierna'
    },
    {
      name: 'Brazos', code: 'brazos'
    },
  ]

  // ejercicios que debe ser un service de la base de datos
  ejerciciosData = [
    { 
      maquina: 'Cinta de Correr',
      estado: 'Disponible',
      ejercicio: {
        nombre: 'No sé el nombre',
      }
     },
     {
       maquina: 'Bicicleta Estática',
       estado: 'Disponible',
       ejercicio: {
         nombre: 'No sé el nombre',
       }
     },
     {
       maquina: 'Máquina de Remo',
       estado: 'Disponible',
       ejercicio: {
         nombre: 'No sé el nombre',
       }
     }
  ];

  constructor(private fb: FormBuilder) {
    this.myGroup = this.fb.group({
      cantidad: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      usuario: new FormControl<string | null>(null),
      descripcion: new FormControl<string | null>(null)
    });
  }

  filtroRutinas(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.rutinas as any[]).length; i++) {
      let ejerci = (this.rutinas as any[])[i];
      if (ejerci.name && ejerci.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(ejerci);
      }
    }

    this.isEmpty = filtered.length === 0;
    this.filtrosRutinas = filtered;
  }

  ngOnInit(): void { }

}
