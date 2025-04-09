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
    this.reportesService.obtenerResumenAgendamientos().subscribe(data => {
      this.resumenAgendamientos = data;
    });
  }
}
