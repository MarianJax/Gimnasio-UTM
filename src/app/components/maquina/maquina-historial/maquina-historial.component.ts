import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MantenimientosService } from '../../../service/mantenimiento/mantenimientos.service';

@Component({
  selector: 'app-maquina-historial',
  templateUrl: './maquina-historial.component.html',
  styleUrls: ['./maquina-historial.component.scss']
})
export class MaquinaHistorialComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  mantenimientos: any[] = [];

  constructor(private route: ActivatedRoute, private mantenimientoService: MantenimientosService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadHistorial();
  }

  loadHistorial() {
    const equipo = this.route.snapshot.paramMap.get('id') ?? '';
    this.mantenimientoService.obtenerHistorialMaquina(equipo).subscribe({
      next: (mantenimientos) => {
        this.mantenimientos = mantenimientos;
      },
      error: (error) => {
        console.error('Error al cargar el historial de mantenimientos:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
      }
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
