import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MantenimientosService } from '../../../service/mantenimiento/mantenimientos.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-maquina-historial',
  templateUrl: './maquina-historial.component.html',
  styleUrls: ['./maquina-historial.component.scss']
})
export class MaquinaHistorialComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  mantenimientos: any[] = [];

  constructor(private route: ActivatedRoute,private mantenimientoService: MantenimientosService) { }

  ngOnInit(): void {
    this.loadHistorial();
  }

  loadHistorial() {
    const equipo = this.route.snapshot.paramMap.get('id') ?? '';
    this.mantenimientoService.obtenerHistorialMaquina(equipo).subscribe(data => {
      console.log(data)
      this.mantenimientos = data;
    });
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = '';  // Limpia el input
    if (this.dt) {
      this.dt.clear();  // Limpia los filtros de la tabla
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Finalizado':
        return 'success';

      case 'En proceso':
        return 'info';

      case 'Pendiente':
        return 'warning';
      default:
        return 'secondary';
    }
  }
}
