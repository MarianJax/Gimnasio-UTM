import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AgendamientosService } from '../../../service/agendamiento/agendamientos.service';
import { AgendamientoType } from './type';

@Component({
  selector: 'app-table-agendamientos',
  templateUrl: './table-agendamientos.component.html',
  styleUrls: ['./table-agendamientos.component.scss']
})
export class TableAgendamientosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  categories: any[] = [
    { name: 'Si', key: 'si' },
    { name: 'No', key: 'no' },
  ];

  agendamientos!: AgendamientoType[];

  constructor(private messageService: MessageService, private agendamientoService: AgendamientosService) {
  }

  ngOnInit() { this.loadAgendamientos(); }

  loadAgendamientos() {
    this.agendamientoService.obtenerAgendamientos().subscribe((data: any[]) => {

      this.agendamientos = data.map(item => ({
        ...item,
        user: {
          ...item.user,
          rol: item.user.roles[0]?.nombre,  // Solo el nombre del primer rol
        }
      }));
    });
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';

      case false:
        return 'danger';

      default:
        return 'warning';
    }
  }

  onSelectionChange(id: string, asistio: boolean) {
    this.agendamientoService.actualizarAgendamiento(id, { asistio }).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Agendamiento actualizado', detail: 'Agendamiento actualizado con éxito', life: 3000 });
        this.loadAgendamientos();
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el agendamiento', life: 3000 });
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

}