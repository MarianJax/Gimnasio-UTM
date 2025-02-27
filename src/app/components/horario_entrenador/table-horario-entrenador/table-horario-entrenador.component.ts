import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-horario-entrenador',
  templateUrl: './table-horario-entrenador.component.html',
  styleUrls: ['./table-horario-entrenador.component.scss']
})
export class TableHorarioEntrenadorComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  maquinas:any = [];

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
        nombre: 'Juan Lopez',
        rol: 'Entrenador',
        fecha: new Date('2023-10-23T00:00:00'),
        franja_hora_inicio: '08:00',
        franja_hora_salida: '12:00',
      },
      {
        nombre: 'Maria Gomez',
        rol: 'Entrenador',
        fecha: new Date('2023-10-24T00:00:00'),
        franja_hora_inicio: '09:00',
        franja_hora_salida: '13:00',
      }
    ];
  }
}

