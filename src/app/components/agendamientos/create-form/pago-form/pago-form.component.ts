import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subscription, take } from 'rxjs';
import { FormService } from '../../../../service/agendamiento/form-service.service';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.scss']
})
export class PagoFormComponent implements OnInit {
  @Input() isMembresia!: Boolean;
  agendamientoData: any
  pagoData: any
  pagoForm: FormGroup;
  selectedImage: string | null = null;
  private formSubscription: Subscription = new Subscription()

  metodoOpt = [
    { name: 'Diario', value: 'diario' },
    { name: 'Mensual', value: 'mensual' }
  ];

  cuentaAhorros = ""
  metodoPago = "Diario"
  fechaPago = ""
  monto = 0.5
  evidenciaPago = ""
  selectedFile: File | null = null

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0].name;
    }
  }

  constructor(private fb: FormBuilder, private formDataService: FormService) {
    this.pagoForm = this.fb.group({
      evidencia_pago: new FormControl<string | null>(null, this.isMembresia ? null : [Validators.required]),
      fecha_pago: new FormControl<Date | null>(null, this.isMembresia ? null : [Validators.required]),
      monto: new FormControl<number | null>(0.0, this.isMembresia ? null : [Validators.required]),
      metodo_pago: new FormControl<string | null>(null, this.isMembresia ? null : [Validators.required]),
    });
  }

  ngOnInit() {
    // Obtener datos de agendamiento
    this.formDataService.pagoData$
      .pipe(
        take(1), // Tomar solo el primer valor para evitar ciclos
      )
      .subscribe((data) => {
        if (data && Object.keys(data).length > 0) {
          // Establecer flag para evitar ciclo
          this.formDataService.setUpdatingFlag(true)
          this.pagoForm.patchValue(data)
          this.selectedImage = data.evidenciaFileName || null
          this.formDataService.setUpdatingFlag(false)
        }
      })

    // Suscribirse a cambios en el formulario con debounce para evitar actualizaciones excesivas
    this.formSubscription = this.pagoForm.valueChanges
      .pipe(
        debounceTime(300), // Esperar 300ms de inactividad antes de emitir
      )
      .subscribe((values) => {
        // Actualizar el servicio solo si los cambios no vienen del servicio
        this.updateFormWithoutCycle()
      })
  }

  ngOnDestroy() {
    // Limpiar suscripciones para evitar memory leaks
    this.formSubscription.unsubscribe()
  }

  // Método para validar el formulario (puede ser llamado desde el componente padre)
  validateForm(): boolean {
    if (this.isMembresia) {
      return true // Si tiene membresía, no necesita validación
    }

    if (this.pagoForm.invalid) {
      let errors: { [key: string]: string } = {};
      Object.keys(this.pagoForm.controls).forEach((key) => {
        const control = this.pagoForm.get(key)
        errors = { ...errors, ...this.validatedForm(key, control) as { [key: string]: string } }
      })
      this.pagoForm.setErrors(errors)
      return false
    }
    return true
  }

  // Método para actualizar el servicio sin crear ciclos
  private updateFormWithoutCycle(): void {
    if (this.pagoForm.valid || this.isMembresia) {
      const formData = {
        ...this.pagoForm.value,
        evidenciaFileName: this.selectedImage,
        evidenciaFile: this.selectedFile,
        isMembresia: this.isMembresia,
      }
      this.formDataService.updatePagoData(formData)
    }
  }

  private validatedForm(key: string, control: any) {
    switch (key) {
      case 'evidencia_pago':
        if (control?.errors && control?.errors['required']) {
          return { evidencia_pago: 'La evidencia de pago es requerida' };
        }
        break;
      case 'fecha_pago':
        if (control?.errors && control?.errors['required']) {
          return { fecha_pago: 'La fecha de pago es requerida' };
        }
        break;
      case 'monto':
        if (control?.errors && control?.errors['required']) {
          return { monto: 'El monto es requerido' };
        }
        break;
      case 'metodo_pago':
        if (control?.errors && control?.errors['required']) {
          return { metodo_pago: 'El método de pago es requerido' };
        }
        break;
    }
    return {} as { [key: string]: string }; // Ensure a default return value with proper type
  }
}
