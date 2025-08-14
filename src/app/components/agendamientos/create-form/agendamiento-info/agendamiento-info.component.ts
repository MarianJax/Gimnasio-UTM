import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import {
  capitalizeFirstLetter,
  formatDate,
  formatTime,
  generarRangoHoras
} from '../../../../core/utiils/formatters';
import { AuthService } from '../../../../pages/login/auth.service';
import { HorarioService } from '../../../../service/horarios/horario.service';
import { InstitucionService } from '../../../../service/institucion/institucion.service';
import { MembresiaService } from '../../../../service/membresias/membresia.service';

export interface Estados {
  name: string;
  code: string;
}

interface HorarioType {
  distribucion: DistribucionType
  hora_fin: string
  hora_inicio: string
  jornada: string
}

interface DistribucionType {
  cupo: number
  pago_diario: string
  pago_mensual: string
  pago_semanal: string
  tiempo: number
}

const FECHA_ACTUAL = new Date();

@Component({
  selector: 'app-agendamiento-info',
  templateUrl: './agendamiento-info.component.html',
  styleUrls: ['./agendamiento-info.component.scss'],
})

export class AgendamientoInfoComponent implements OnInit {
  minDate: Date = new Date();
  maxDate: Date = FECHA_ACTUAL;
  agendarForm: FormGroup;
  INIT_DATA: any[] = [];
  facultades: Estados[] = [];
  departamentos: Estados[] = [];
  carreras: Estados[] = [];
  EsP_Administrativo: boolean = false;

  horas!: SelectItemGroup[];

  constructor(private fb: FormBuilder, private serviceMembresia: MembresiaService, private horarioService: HorarioService, private authService: AuthService, private institucionService: InstitucionService) {
    const date = new Date();

    this.obtenerHorarios(this.authService.getUserData().rol, date);

    this.agendarForm = this.fb.group({
      fecha: new FormControl<Date | null>({ value: date, disabled: false }, [
        Validators.required,
      ]),
      hora: new FormControl<Estados | null>(null, [Validators.required]),
      facultad: new FormControl<Estados | null>(null),
      departamento: new FormControl<Estados | null>(null),
      carrera: new FormControl<Estados | null>(null),
    });
  }

  ObtenerDatosInstitucion() {
    this.institucionService.obtenerDatosInstitucion().subscribe((data: any) => {
      this.INIT_DATA = data.value;
      data.value.forEach((facultad: any) => {
        if (facultad.tipo === 'ACADEMICO') {
          this.facultades.push({ name: capitalizeFirstLetter(facultad.nombre.trim()), code: facultad.idfacultad });
        } else {
          this.departamentos.push({ name: capitalizeFirstLetter(facultad.nombre.trim()), code: facultad.idfacultad });
        }
      });

      this.INIT_DATA.forEach((facultad: any) => {
        if (facultad.idfacultad === localStorage.getItem('facultad')) {
          this.carreras = [];
          const carrera = JSON.parse(facultad.carrera);
          carrera.forEach((carrera: any) => {
            this.carreras.push({
              name: capitalizeFirstLetter(carrera.carrera.trim()),
              code: carrera.idescuela,
            });
          });
          this.agendarForm.patchValue({
            facultad: this.facultades.find((f) => f.code == localStorage.getItem('facultad')),
            carrera: this.carreras.find((f) => f.code == localStorage.getItem('carrera')),
          });

        }
      });

      this.agendarForm.patchValue({
        departamento: this.facultades.find((f) => f.code === localStorage.getItem('departamento')),
      })

    });
  }

  obtenerHorarios(rol: string, fecha: Date) {
    const getDay = capitalizeFirstLetter(formatDate(fecha));
    this.horarioService.obtenerHorarioPorRolYDia(rol, getDay, fecha.toISOString()).subscribe({
      next: ({ horarios, agendamientos }: {
        horarios: HorarioType[];
        agendamientos: { hora_inicio: string, total: string }[];
      }) => {
        this.horas = [];
        console.log(agendamientos, 'agendamientos') 
        if (horarios.length < 1) return;
        horarios.forEach((horario: HorarioType) => {
          console.log(
              formatTime(horario.hora_inicio as string),"-",
              formatTime(horario.hora_fin as string),"-",
              Number(horario.distribucion.tiempo),"-",
              agendamientos,"-",
              horario.distribucion.cupo,"-",
              fecha, "-"
            );
          const label = horario.jornada === 'Matutina' ? 'Mañana' : 'Tarde';
          this.horas.push({
            label,
            items: generarRangoHoras(
              formatTime(horario.hora_inicio as string),
              formatTime(horario.hora_fin as string),
              Number(horario.distribucion.tiempo),
              agendamientos,
              horario.distribucion.cupo,
              fecha
            ),
          });
        })
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit() {

    const user = this.authService.getUserData();
    this.serviceMembresia
      .obtenerMembresiaPorUsuario(user.id, new Date())
      .subscribe({
        next: (data) => {
          this.minDate = new Date(FECHA_ACTUAL);
          if (data && data.pagos && data.pagos.validacion_pago && data.pagos.validacion_pago[0].estado==='Aprobado') {
            this.maxDate = new Date(data.fecha_fin);            
          } else {
            this.maxDate = new Date();
          }
        },
        error: (error) => {
          console.error('Error al obtener membresías:', error);
        },
      });

    this.agendarForm.get('fecha')?.valueChanges.subscribe((val) => {
      this.obtenerHorarios(this.authService.getUserData().rol, val as Date);
    });

    this.agendarForm.get('facultad')?.valueChanges.subscribe((val) => {
      this.INIT_DATA.forEach((facultad: any) => {
        if (facultad.idfacultad === val.code) {
          this.carreras = [];
          const carrera = JSON.parse(facultad.carrera);
          carrera.forEach((carrera: any) => {
            this.carreras.push({
              name: capitalizeFirstLetter(carrera.carrera.trim()),
              code: carrera.idescuela,
            });
          });
        }
      });
    });

    this.agendarForm.get('carrera')?.valueChanges.subscribe((val) => {
      localStorage.setItem('carrera', val.code);
      localStorage.setItem('facultad', this.agendarForm.get('facultad')?.value.code);
    });

    this.ObtenerDatosInstitucion();
  }

  // Método para validar el formulario (puede ser llamado desde el componente padre)
  validateForm(): boolean {
    if (this.agendarForm.invalid) {
      const errors: { [key: string]: string } = {};
      Object.keys(this.agendarForm.controls).forEach((key) => {
        const control = this.agendarForm.get(key);
        if (key === 'fecha' && control?.errors && control?.errors['required']) {
          errors[key] = 'La fecha es requerida';
        } else if (
          key === 'hora' &&
          control?.errors &&
          control?.errors['required']
        ) {
          errors[key] = 'La hora es requerida';
        }
        this.agendarForm.setErrors(errors);
      });
      return false;
    }
    return true;
  }
}
