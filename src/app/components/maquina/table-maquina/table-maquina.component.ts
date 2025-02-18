import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposerviceService } from 'src/app/pages/admin/equipos/service/equiposervice.service';

@Component({
  selector: 'app-table-maquina',
  templateUrl: './table-maquina.component.html',
  styleUrls: ['./table-maquina.component.scss']
})
export class TableMaquinaComponent implements OnInit {

  constructor(
    private equipoService: EquiposerviceService,
    private router: Router,

  ) {  }
  
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
      .subscribe((data) => (this.maquinas = data));
  }
}