import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})

export class RutinasComponent implements OnInit {
  maquinasData = [
    { name: 'Cinta de Correr', code: 'cinta-de-correr' },
    { name: 'Bicicleta Estática', code: 'bicicleta-estatica' },
    { name: 'Máquina de Remo', code: 'maquina-de-remo' },
    { name: 'Elíptica', code: 'eliptica' },
    { name: 'Máquina de Pesas', code: 'maquina-de-pesas' },
  ];

  myGroup: FormGroup;
  filtrosMaquinas: any[] = [];
  suggestions: any[] | undefined;

  maquinas: any[] = [];
  isEmpty: boolean = false;

  rutinas = [
    {
      name: 'Pecho',
      code: 'pecho',
      hora: '1 hora',
      duracion: '1 hora',
      estado: 'Disponible',
      fecha: 'Ingrese su usuario (Cedula o Pasaporte)',
      descripcion: 'Descripción'
    },
    {
      name: 'Pierna',
      code: 'pierna',
      hora: '1 hora',
      duracion: '1 hora',
      estado: 'Disponible',
      fecha: 'Ingrese su usuario (Cedula o Pasaporte)',
      descripcion: 'Descripción'
    },
    {
      name: 'Brazos',
      code: 'brazos',
      hora: '1 hora',
      duracion: '1 hora',
      estado: 'Disponible',
      fecha: 'Ingrese su usuario (Cedula o Pasaporte)',
      descripcion: 'Descripción'
    },
  ]

  filtroMaquina(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.maquinas as any[]).length; i++) {
      let country = (this.maquinas as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.isEmpty = filtered.length === 0;
    this.filtrosMaquinas = filtered;
  }

  constructor(private fb: FormBuilder) {
    this.myGroup = this.fb.group({
      cantidad: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      usuario: new FormControl<string | null>(null),
      descripcion: new FormControl<string | null>(null)
    });
  }

  ngOnInit(): void {
    this.maquinas = this.maquinasData;
  }

}
