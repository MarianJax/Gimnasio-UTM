import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-ejercicios',
  templateUrl: './table-ejercicios.component.html',
  styleUrls: ['./table-ejercicios.component.scss']
})
export class TableEjerciciosComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  maquinas: any = [];

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
        nombre: 'Bicicleta',
        ejercicio: 'Cardio',
        maquina: 'Bicicleta',
        series: 3,
        repeticiones: 15
      },
      {
        nombre: 'Cinta',
        ejercicio: 'Cardio',
        maquina: 'Cinta',
        series: 3,
        repeticiones: 15
      },
      {
        nombre: 'Press de banca',
        ejercicio: 'Pecho',
        maquina: 'Press de banca',
        series: 3,
        repeticiones: 15
      },
      {
        nombre: 'Prensa',
        ejercicio: 'Piernas',
        maquina: 'Prensa',
        series: 3,
        repeticiones: 15
      },
      {
        nombre: 'Polea',
        ejercicio: 'Espalda',
        maquina: 'Polea',
        series: 3,
        repeticiones: 15
      }
    ];
  }
}

