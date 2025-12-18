import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GrupoMuscularService } from 'src/app/service/grupoMuscular/grupo-muscular.service';

interface gruposMusculares {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-table-grupo-muscular',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  gruposMusculares!: gruposMusculares[];

  ngOnInit(): void {
    this.loadGruposMusculares();
  }

  constructor(
    private grupoMuscularService: GrupoMuscularService,
    private messageService: MessageService
  ) {}

  loadGruposMusculares() {
    this.grupoMuscularService.obtenerGruposMusculares().subscribe(
      (data: any[]) =>
        (this.gruposMusculares = data.map((item) => {
          return {
            id: item.id,
            nombre: item.nombre,
          };
        }))
    );
  }

  eliminar(id: string) {
    this.grupoMuscularService.eliminarGrupoMuscular(id).subscribe({
      next: ({ status, message }: any) => {
        if (status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: message,
          });
          this.loadGruposMusculares();
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
          detail: 'Error al eliminar el grupo muscular',
        });
      },
    });
  }
}
