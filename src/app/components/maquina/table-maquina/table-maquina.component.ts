import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from 'src/app/service/equipo/equipo.service';

@Component({
  selector: 'app-table-maquina',
  templateUrl: './table-maquina.component.html',
  styleUrls: ['./table-maquina.component.scss']
})
export class TableMaquinaComponent implements OnInit {
  emptyMessage: string = 'Cargando equipos...';

  constructor(
    private equipoService: EquiposService,
    private router: Router,

  ) { }

  maquinas = [];

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
    this.equipoService
      .obtenerDatos()
      .subscribe({
        next: (data: any) => {
          this.maquinas = data;
          if (this.maquinas.length === 0) {
            this.emptyMessage = 'No hay equipos registrados';
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.emptyMessage = 'No tiene permisos para ver equipos registrados';
            console.error('Error -> ', error.status);
          } else if (error.status === 500) {
            this.emptyMessage = 'No se pudo obtener los equipos';
            console.error('Error -> ', error.status);
          }

          console.error('Error -> ', error.status);
        },

      });
  }
}