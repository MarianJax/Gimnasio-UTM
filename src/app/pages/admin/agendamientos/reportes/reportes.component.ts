import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  formatAgendamientoData,
  formatDataByDia,
  formatForChart,
  transformAsistioData,
} from '../../../../core/utiils/formatters';
import { InstitucionService } from '../../../../service/institucion/institucion.service';
import { ReportesService } from '../../../../service/reporte/reportes.service';

interface Options {
  name: string;
  code: string;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  INIT_DATA: any[] = []

  selected!: Options;

  facultades: Options[] = [];
  facultadsSelected!: Options;
  carreras: Options[] = [];
  carreraSelected!: Options;

  departamentos: Options[] = [];
  departamentoSelected!: Options;

  disabled: boolean = true;
  disabledFacultad: boolean = false;
  disabledDepartamento: boolean = false;

  TipoPago!: Options[];

  data: any;
  dataPie: any;
  options: any;
  optionsPie: any;
  dataBar: any;
  optionsBar: any;
  dataLine: any;
  optionsLine: any;

  selectedCountry!: { name: string; code: string };

  constructor(
    private institucionService: InstitucionService,
    private reporteService: ReportesService
  ) { }

  ngOnInit() {
    this.items = [
      { icon: 'dashboard', route: '/admin', label: 'Inicio' },
      { label: 'Agendamientos', route: '/admin/agendamientos' },
      { label: 'Reporte' },
    ];

    this.TipoPago = [
      { name: 'Diario', code: 'Diario' },
      { name: 'Mensual', code: 'Mensual' },
    ];
    this.ObtenerDatosInstitucion();
    this.ObtenerDatosGraficos();
  }

  ObtenerDatosGraficos(facultad?: string, carrera?: string, tipoPago?: string) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.reporteService
      .obtenerDatosAgendamientosGraficos(facultad, carrera, tipoPago)
      .subscribe(
        ({
          reservasRol,
          reservasPorRolesYDias,
          reservasPorDias,
          reservasPorEstados,
        }: any) => {
          const reservasRolFormatter = formatForChart(reservasRol);
          const reservasPorRolesYDiasFormatter = formatDataByDia(
            reservasPorRolesYDias
          );
          const reservasPorDiasFormatter =
            formatAgendamientoData(reservasPorDias);
          const reservasPorEstadosFormatter =
            transformAsistioData(reservasPorEstados);
          if (reservasRolFormatter) {
            this.data = {
              labels: reservasRolFormatter.roles,
              datasets: [
                {
                  data: reservasRolFormatter.data,
                  backgroundColor: [
                    documentStyle.getPropertyValue('--blue-500'),
                    documentStyle.getPropertyValue('--green-500'),
                    documentStyle.getPropertyValue('--pink-500'),
                  ],
                  hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--blue-400'),
                    documentStyle.getPropertyValue('--green-400'),
                    documentStyle.getPropertyValue('--pink-400'),
                  ],
                },
              ],
            };

            this.options = {
              cutout: '60%',
              plugins: {
                legend: {
                  labels: {
                    color: textColor,
                  },
                },
              },
            };
          }
          if (reservasPorDiasFormatter) {
            this.dataLine = {
              labels: reservasPorDiasFormatter.labels,
              datasets: [
                {
                  label: 'Agendamientos',
                  data: reservasPorDiasFormatter.data[0].data,
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--teal-500'),
                  tension: 0.4,
                },
              ],
            };

            this.optionsLine = {
              maintainAspectRatio: false,
              aspectRatio: 0.6,
              plugins: {
                legend: {
                  labels: {
                    color: textColor,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: textColorSecondary,
                  },
                  grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                  },
                },
                y: {
                  ticks: {
                    color: textColorSecondary,
                  },
                  grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                  },
                },
              },
            };
          }
          if (reservasPorRolesYDiasFormatter) {
            const colors = [
              documentStyle.getPropertyValue('--pink-500'),
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--green-500'),
            ];
            const hoverColors = [
              documentStyle.getPropertyValue('--pink-400'),
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--green-400'),
            ];
            const datasets = reservasPorRolesYDiasFormatter.datas.map(
              (data: any, index: number) => {
                return {
                  label: data.label,
                  backgroundColor: colors[index],
                  borderColor: colors[index],
                  data: data.data,
                };
              }
            );

            this.dataBar = {
              labels: reservasPorRolesYDiasFormatter.dias,
              datasets,
            };

            this.optionsBar = {
              maintainAspectRatio: false,
              aspectRatio: 0.8,
              plugins: {
                legend: {
                  labels: {
                    color: textColor,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: textColorSecondary,
                    font: {
                      weight: 500,
                    },
                  },
                  grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                  },
                },
                y: {
                  ticks: {
                    color: textColorSecondary,
                  },
                  grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                  },
                },
              },
            };
          }
          if (reservasPorEstadosFormatter) {
            this.dataPie = {
              labels: reservasPorEstadosFormatter.labels,
              datasets: [
                {
                  data: reservasPorEstadosFormatter.data,
                  backgroundColor: [
                    documentStyle.getPropertyValue('--blue-500'),
                    documentStyle.getPropertyValue('--orange-500'),
                    documentStyle.getPropertyValue('--green-500'),
                  ],
                  hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--blue-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                    documentStyle.getPropertyValue('--green-400'),
                  ],
                },
              ],
            };

            this.optionsPie = {
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                    color: textColor,
                  },
                },
              },
            };
          }
        }
      );
  }

  ObtenerDatosInstitucion() {
    this.institucionService.obtenerDatosInstitucion().subscribe((data: any) => {
      this.INIT_DATA = data.value;
      this.facultades = [];
      data.value.forEach((facultad: any) => {
        if (facultad.tipo === 'ACADEMICO') {
          this.facultades.push({ name: facultad.nombre.trim(), code: facultad.idfacultad });
        } else {
          this.departamentos.push({ name: facultad.nombre.trim(), code: facultad.idfacultad });
        }
      });
    });
  }
  onDepartamentoChange(event: any) {
    if (event.value) {
      this.departamentoSelected = event.value;
      this.disabledFacultad = true;
      this.ObtenerDatosGraficos(event.value.code);
    } else {
      this.ObtenerDatosGraficos();
      this.disabledFacultad = false;
    }
  }

  onFacultadChange(event: any) {
    if (event.value) {
      console.log(this.INIT_DATA);
      this.INIT_DATA.forEach((facultad: any) => {
        if (facultad.idfacultad === event.value.code) {
          this.carreras = [];
          const carers = JSON.parse(facultad.carrera);
          console.log(carers);
          carers.forEach((carrera: any) => {
            this.carreras.push({ name: carrera.carrera.trim(), code: carrera.idescuela });
          });
          this.facultadsSelected = event.value;
          this.disabled = false;
          this.disabledDepartamento = true;
          this.ObtenerDatosGraficos(event.value.code);
        }
      });
    } else {
      this.ObtenerDatosGraficos();
      this.facultadsSelected = event.value;
      this.disabled = true;
      this.disabledDepartamento = false;
      this.carreras = [];
    }
  }

  onCarreraChange(event: any) {
    if (event.value) {
      this.ObtenerDatosGraficos(this.facultadsSelected.code, event.value.code);
      this.carreraSelected = event.value;
    } else {
      this.carreraSelected = event.value;
      this.ObtenerDatosGraficos(this.facultadsSelected.code);
    }
  }

  onTipoChange(event: any) {
    if (event.value) {
      this.ObtenerDatosGraficos(
        this.facultadsSelected ? this.facultadsSelected.code : '',
        this.carreraSelected ? this.carreraSelected.code : '',
        event.value.code
      );
    } else {
      this.ObtenerDatosGraficos(
        this.facultadsSelected ? this.facultadsSelected.code : '',
        this.carreraSelected ? this.carreraSelected.code : ''
      );
    }
  }

  clearFilter() {
    let deflt!: any;
    this.carreras = [];
    this.carreraSelected = deflt;
    this.selected = deflt;
    this.facultadsSelected = deflt;
    this.ObtenerDatosGraficos();
    this.disabled = true;
  }
}
