import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-rutina',
  templateUrl: './table-rutina.component.html',
  styleUrls: ['./table-rutina.component.scss']
})
export class TableRutinaComponent implements OnInit {
  updatedRutinaForm: FormGroup;
  visible: boolean = false;
  rutina: any = undefined;

  Intensidad = [
    { name: 'Alto', value: 'alto' },
    { name: 'Medio', value: 'medio' },
    { name: 'Bajo', value: 'bajo' }
  ]

  showDialog(id: string) {
    this.visible = true;

    this.rutina = this.rutinas.find((rutina: { id: string; }) => rutina.id === id);
    this.updatedRutinaForm.patchValue({
      nombre: this.rutina.nombre,
      intensidad: this.Intensidad.find((intensidad) => intensidad.name === this.rutina.intensidad),
      descripcion: this.rutina.descripcion,
    });

  }

  closedDialog() {
    this.visible = false;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.updatedRutinaForm = this.fb.group({
      nombre: new FormControl<string | null>(null),
      intensidad: new FormControl<string | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }

  rutinas: any = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.rutinas = [
      {
        id: 1,
        nombre: 'Rutina 1',
        intensidad: 'Alto',
        cantidad_ejercicios: 5,
        descripcion: 'Rutina de ejercicios para principiantes',
      },
      {
        id: 2,
        nombre: 'Rutina 2',
        intensidad: 'Medio',
        cantidad_ejercicios: 10,
        descripcion: 'Rutina de ejercicios intermedios',
      },
    ];
  }
}


