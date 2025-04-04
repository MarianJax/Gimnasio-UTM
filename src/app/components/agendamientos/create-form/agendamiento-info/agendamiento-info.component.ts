import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { debounceTime, skip, Subscription } from 'rxjs';
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

  constructor(private fb: FormBuilder, private horarioService: HorarioService, private formDataService: FormService) {
    const date = !this.isMembresia ? new Date() : null;
    if (date) {
      this.fechaAgendamiento = capitalizeFirstLetter(formatDate(date));
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
    console.log(this.isMembresia, 'this.isMembresia');
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

    // Y modifica la suscripción a agendamientoData$ en el ngOnInit:
    this.formDataService.agendamientoData$.pipe(
      skip(1) // Salta la emisión inicial
    ).subscribe((data) => {
      if (data && Object.keys(data).length > 0) {
        // Deshabilitar temporalmente valueChanges
        this.formSubscription.unsubscribe();

        this.agendarForm.patchValue(data, { emitEvent: false }); // <-- emitEvent: false es clave

        // Restaurar la suscripción
        this.formSubscription = this.agendarForm.valueChanges
          .pipe(debounceTime(300))
          .subscribe(() => this.updateFormWithoutCycle());
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
    return true
  }

  // Modifica el método updateFormWithoutCycle
  private updateFormWithoutCycle(): void {
    if (this.agendarForm.valid) {
      // 1. Desuscribir temporalmente para evitar el ciclo
      this.formSubscription.unsubscribe();

      // 2. Actualizar el servicio
      this.formDataService.updateAgendamientoData({
        fecha: this.agendarForm.get('fecha')?.value,
        ingreso: this.agendarForm.get('ingreso')?.value,
        salida: this.agendarForm.get('salida')?.value,
      });

      // 3. Volver a suscribir después de un breve retraso
      setTimeout(() => {
        this.formSubscription = this.agendarForm.valueChanges
          .pipe(debounceTime(300))
          .subscribe(() => this.updateFormWithoutCycle());
      }, 100);
    }
  }

}
