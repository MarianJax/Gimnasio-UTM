import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { FormService } from "src/app/service/agendamiento/form-service.service";
import { capitalizeFirstLetter, filterHoursForSalida, formatDate, formatTime, getAvailableHours } from '../../../../core/utiils/formatters';
import { HorarioService } from '../../../../service/horarios/horario.service';

export interface Estados {
  name: string;
  code: string;
}

@Component({
  selector: 'app-agendamiento-info',
  templateUrl: './agendamiento-info.component.html',
  styleUrls: ['./agendamiento-info.component.scss']
})
export class AgendamientoInfoComponent implements OnInit, OnDestroy {
  @Input() isMembresia!: Boolean;
  @Input() rolUser!: string;
  private formSubscription: Subscription = new Subscription()
  agendarForm: FormGroup;

  ingresoOpt!: SelectItemGroup[];

  salidaOpt: SelectItemGroup[] = [];

  fechaAgendamiento: string = '';
  fechaInicial: Date | null = null;

  constructor(private fb: FormBuilder, private horarioService: HorarioService, private formDataService: FormService) {
    const date = !this.isMembresia ? new Date() : null;
    if (date) {
      this.fechaAgendamiento = capitalizeFirstLetter(formatDate(date));
      this.fechaInicial = date;
    }

    // Cargar datos previos si existen
    this.formDataService.agendamientoData$.subscribe((data) => {
      if (data && Object.keys(data).length > 0) {
        this.agendarForm.patchValue(data)
      }
    });

    this.agendarForm = this.fb.group({
      fecha: new FormControl<Date | null>({ value: date, disabled: !this.isMembresia as boolean }, [Validators.required]),
      ingreso: new FormControl<Estados | null>(null, [Validators.required]),
      salida: new FormControl<Estados | null>(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.horarioService.obtenerHorarioPorRolYDia(this.rolUser, this.fechaAgendamiento)
      .subscribe({
        next: (value) => {
          this.ingresoOpt = [];
          value.forEach((horario: any) => {
            const label = horario.jornada === 'Matutina' ? 'Mañana' : 'Tarde';
            this.ingresoOpt.push({ label, items: getAvailableHours(formatTime(horario.hora_inicio as string), formatTime(horario.hora_fin as string)) });
          });
          // this.ingresoOpt = filterHoursGreaterThanCurrentTime(this.ingresoOpt).map(group => { return { label: group.label, items: group.items.slice(0, -1) } });
        },
        error: (err) => {
          console.log(err)
        },
      })


    this.agendarForm.get('ingreso')?.valueChanges.subscribe((val) => {
      this.salidaOpt = [];
      this.salidaOpt = filterHoursForSalida(val, this.ingresoOpt);
    });

    // **Cargar datos previos si existen**
    this.formDataService.agendamientoData$.subscribe((data) => {
      if (data && Object.keys(data).length > 0) {
        this.agendarForm.patchValue(data);

        // Habilitar o deshabilitar el campo "fecha" según el valor de isMembresia
        if (this.isMembresia) {
          this.agendarForm.get('fecha')?.enable(); // Habilitar si es membresía
        } else {
          this.agendarForm.get('fecha')?.disable(); // Deshabilitar si no lo es
        }
      }
    });

    // Suscribirse a cambios en el formulario con debounce para evitar actualizaciones excesivas
    this.formSubscription = this.agendarForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.updateFormWithoutCycle())
  }

  ngOnDestroy() {
    // Limpiar suscripciones para evitar memory leaks
    this.formSubscription.unsubscribe()
  }

  // Método para validar el formulario (puede ser llamado desde el componente padre)
  validateForm(): boolean {
    if (this.agendarForm.invalid) {
      const errors: { [key: string]: string } = {};
      Object.keys(this.agendarForm.controls).forEach((key) => {
        const control = this.agendarForm.get(key)
        if (key === 'fecha' && control?.errors && control?.errors['required']) {
          errors[key] = 'La fecha es requerida';
        } else if (key === 'ingreso' && control?.errors && control?.errors['required']) {
          errors[key] = 'La hora de ingreso es requerida';
        } else if (key === 'salida' && control?.errors && control?.errors['required']) {
          errors[key] = 'La hora de salida es requerida';
        }
        this.agendarForm.setErrors(errors)
      })
      return false
    }
    this.agendarForm.get('fecha')?.enable();
    return true
  }

  private updateFormWithoutCycle(): void {
    if (this.agendarForm.valid) {
      this.formDataService.updateAgendamientoData(this.agendarForm.value)
    }
  }

}
