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
  filterHoursForSalida,
  formatDate,
  formatTime,
  getAvailableHours,
} from '../../../../core/utiils/formatters';
import { HorarioService } from '../../../../service/horarios/horario.service';
import { AuthService } from '../../../../pages/login/auth.service';

export interface Estados {
  name: string;
  code: string;
}

@Component({
  selector: 'app-agendamiento-info',
  templateUrl: './agendamiento-info.component.html',
  styleUrls: ['./agendamiento-info.component.scss'],
})
export class AgendamientoInfoComponent implements OnInit {
  agendarForm: FormGroup;

  ingresoOpt!: SelectItemGroup[];

  salidaOpt: SelectItemGroup[] = [];

  fechaAgendamiento: string = '';

  constructor(private fb: FormBuilder, private horarioService: HorarioService, private authService: AuthService) {
    const date = new Date();
    this.fechaAgendamiento = capitalizeFirstLetter(formatDate(date));

    this.obtenerHorarios(this.authService.getUserData().roles, this.fechaAgendamiento);

    this.agendarForm = this.fb.group({
      fecha: new FormControl<Date | null>({ value: date, disabled: false }, [
        Validators.required,
      ]),
      ingreso: new FormControl<Estados | null>(null, [Validators.required]),
      salida: new FormControl<Estados | null>(null, [Validators.required]),
    });
  }

  obtenerHorarios(rol: string, fecha: string) {
    this.horarioService.obtenerHorarioPorRolYDia(rol, fecha).subscribe({
      next: (value) => {
        this.ingresoOpt = [];
        value.forEach((horario: any) => {
          const label = horario.jornada === 'Matutina' ? 'Mañana' : 'Tarde';
          this.ingresoOpt.push({
            label,
            items: getAvailableHours(
              formatTime(horario.hora_inicio as string),
              formatTime(horario.hora_fin as string)
            ),
          });
        });
        // this.ingresoOpt = filterHoursGreaterThanCurrentTime(this.ingresoOpt).map(group => { return { label: group.label, items: group.items.slice(0, -1) } });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.agendarForm.get('fecha')?.valueChanges.subscribe((val) => {
      this.fechaAgendamiento = capitalizeFirstLetter(formatDate(val));
      this.obtenerHorarios(this.authService.getUserData().roles, this.fechaAgendamiento);
    });
    this.agendarForm.get('ingreso')?.valueChanges.subscribe((val) => {
      this.salidaOpt = [];
      this.salidaOpt = filterHoursForSalida(val, this.ingresoOpt);
    });
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
          key === 'ingreso' &&
          control?.errors &&
          control?.errors['required']
        ) {
          errors[key] = 'La hora de ingreso es requerida';
        } else if (
          key === 'salida' &&
          control?.errors &&
          control?.errors['required']
        ) {
          errors[key] = 'La hora de salida es requerida';
        }
        this.agendarForm.setErrors(errors);
      });
      return false;
    }
    return true;
  }
}
