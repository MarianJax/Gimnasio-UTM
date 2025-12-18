import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RutinasService } from '../../../service/rutinas/rutinas.service';

interface rutinas {
  id: string;
  url: string;
}

@Component({
  selector: 'app-table-rutina',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  rutinas!: rutinas[];

  ngOnInit(): void {
    this.loadRutinas();
  }

  constructor(
    private rutinaService: RutinasService,
    private messageService: MessageService
  ) {}

  loadRutinas() {
    this.rutinaService.obtenerRutinas().subscribe(
      (data: any[]) =>
        (this.rutinas = data.map((item) => {
          return {
            id: item.id,
            url: item.url,
          };
        }))
    );
  }

  eliminar(id: string) {
    this.rutinaService.eliminarRutina(id).subscribe({
      next: ({ status, message }: any) => {
        if (status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: message,
          });
          this.loadRutinas();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar la rutina',
        });
      },
    });
  }
}
