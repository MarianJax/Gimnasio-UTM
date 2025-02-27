import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-rutina',
  templateUrl: './table-rutina.component.html',
  styleUrls: ['./table-rutina.component.scss']
})
export class TableRutinaComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  rutinas: any = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.rutinas = [
      {
        nombre: 'Rutina 1',
        intensidad: 'Alto',
        cantidad_ejercicios: 5,
        descripcion: 'Rutina de ejercicios para principiantes',
      },
      {
        nombre: 'Rutina 2',
        intensidad: 'Medio',
        cantidad_ejercicios: 10,
        descripcion: 'Rutina de ejercicios intermedios',
      },
    ];
  }
}


