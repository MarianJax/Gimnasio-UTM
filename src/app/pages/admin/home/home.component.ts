import { Component } from '@angular/core';
import { ReportesService } from '../../../service/reporte/reportes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resumenAgendamientos!: { mantenimientos: number, maquinas: number, pagos: number, users: number };

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.reportesService.obtenerResumenAgendamientos().subscribe({next: (data) => {
      this.resumenAgendamientos = data;
    },
    error: (error) => {
      console.error('Error al obtener el resumen de agendamientos:', error);
    }});
  }
}
