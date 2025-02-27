import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-horarios',
  templateUrl: './table-horarios.component.html',
  styleUrls: ['./table-horarios.component.scss']
})
export class TableHorariosComponent implements OnInit {

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
      nombre: 'Administrador',
      jornada: 'Matutina',
      dia: 'Lunes',
      horaIngreso: '08:00',
      horaSalida: '12:00',
      }
    ];
  }
}
