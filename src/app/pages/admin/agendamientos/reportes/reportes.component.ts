import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CarreraService } from '../../../../service/institucion/carrera.service';
import { FacultadService } from '../../../../service/institucion/facultad.service';
import { ReportesService } from '../../../../service/reporte/reportes.service';

interface Options { name: string; code: string; }

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  facultades: Options[] = [];
  facultadsSelected!: string;
  carreras: Options[] = [];
  carreraSelected!: string;

  disabled: boolean = true;

  TipoPago!: Options[];


  data: any;
  dataPie: any;
  options: any;
  optionsPie: any;
  dataBar: any;
  optionsBar: any;
  dataLine: any;
  optionsLine: any;

  selectedCountry!: { name: string; code: string; };

  constructor(private facultadService: FacultadService, private carreraService: CarreraService, private reporteService: ReportesService) { }

  private convertDayToSpanish(day: string): string {
    const daysInSpanish: { [key: string]: string } = {
      'Sunday': 'Domingo',
      'Monday': 'Lunes',
      'Tuesday': 'Martes',
      'Wednesday': 'Miércoles',
      'Thursday': 'Jueves',
      'Friday': 'Viernes',
      'Saturday': 'Sábado'
    };

    return daysInSpanish[day] || day; // Si no se encuentra el día, se devuelve el mismo.
  }

  ngOnInit() {
    this.items = [{ icon: 'dashboard', route: '/admin', label: 'Inicio' }, { label: 'Agendamientos', route: '/admin/agendamientos' }, { label: 'Reporte' }];

    this.TipoPago = [
      { name: 'Diario', code: 'Diario' },
      { name: 'Mensual', code: 'Mensual' }
    ];
    this.ObtenerFacultades()
    this.ObtenerDatosGraficos()
  }

  ObtenerDatosGraficos(facultad?: string, carrera?: string, tipoPago?: string) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.reporteService.obtenerDatosAgendamientosGraficos(facultad, carrera, tipoPago).subscribe((data: any) => {
      if (data.reservasRol) {
        this.data = {
          labels: data.reservasRol.roles,
          datasets: [
            {
              data: data.reservasRol.data,
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        this.options = {
          cutout: '60%',
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          }
        };
      }
      if (data.reservasPorDias) {
        this.dataLine = {
          labels: data.reservasPorDias.labels.map((label: string) => this.convertDayToSpanish(label)),
          datasets: [
            {
              label: 'Agendamientos',
              data: [93, 107, 120, 100, 142],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--teal-500'),
              tension: 0.4
            }
          ]
        };

        this.optionsLine = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };
      }
      if (data.reservasPorRolesYDias) {
        const datasets = data.reservasPorRolesYDias.datas.map((data: any) => {
          return {
            label: data.label,
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: data.data
          };
        })

        this.dataBar = {
          labels: data.reservasPorRolesYDias.dias.map((label: string) => this.convertDayToSpanish(label)),
          datasets
        };

        this.optionsBar = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
                font: {
                  weight: 500
                }
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }

          }
        };
      }
      if (data.reservasPorEstados) {

        this.dataPie = {
          labels: data.reservasPorEstados.labels,
          datasets: [
            {
              data: data.reservasPorEstados.data,
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        this.optionsPie = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor
              }
            }
          }
        };
      }
    })
  }

  ObtenerFacultades() {
    this.facultadService.obtenerFacultades().subscribe((data: any) => {
      this.facultades = [];
      data.forEach((facultad: any) => {
        this.facultades.push({ name: facultad.nombre, code: facultad.id });
      });
    });
  }

  onFacultadChange(event: any) {
    if (event.value) {
      console.log('Facultad seleccionada:', event.value.code);
      this.carreraService.obtenerCarrerasPorFacultad(event.value.code).subscribe((data: any) => {
        this.carreras = [];
        data.forEach((carrera: any) => {
          this.carreras.push({ name: carrera.nombre, code: carrera.id });
        });
        this.facultadsSelected = event.value.code;
        this.disabled = false;

        this.ObtenerDatosGraficos(event.value.code)
      });
    } else {    
      this.ObtenerDatosGraficos()
      this.facultadsSelected = '';
      this.disabled = true;
      this.carreras = [];
    }
  }

  onCarreraChange(event: any) {
    console.log('Carrera seleccionada:', event.value);
    if (event.value) {
      this.ObtenerDatosGraficos(this.facultadsSelected, event.value.code)
      this.carreraSelected = event.value.code;
    } else {
      this.carreraSelected = '';
      this.ObtenerDatosGraficos(this.facultadsSelected)
    }
  }

  onTipoChange(event: any) { 
    if (event.value) {
      this.ObtenerDatosGraficos(this.facultadsSelected, this.carreraSelected, event.value.code)
    } else {
      this.ObtenerDatosGraficos(this.facultadsSelected, this.carreraSelected)
    }
  }

}
