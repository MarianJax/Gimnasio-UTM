import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { imageToArrayBuffer } from '../../../../core/utiils/convertImage';
import { RolesService } from '../../../../service/roles/roles.service';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.scss'],
})
export class PagoFormComponent implements OnInit {
  @Input() usuario!: any;
  pagoForm: FormGroup;
  selectedImage: string | null = null;

  metodoOpt = [
    { name: 'Diario', value: 'diario' },
    { name: 'Mensual', value: 'mensual' },
  ];

  cuentaAhorros = '';
  metodoPago = 'Diario';
  fechaPago = '';
  monto = 0.0;
  evidenciaPago = '';
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      imageToArrayBuffer(input).then(({ buffer, mimeType }) => {
        this.pagoForm.patchValue({
          evidencia_pago_buffer: buffer,
          tipo: mimeType,
        });
      });
      this.selectedImage = input.files[0].name;
      this.pagoForm.patchValue({
        evidencia_pago: this.selectedImage,
      });
    }
  }

  constructor(private fb: FormBuilder, private rolService: RolesService) {
    this.pagoForm = this.fb.group({
      evidencia_pago: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      evidencia_pago_buffer: new FormControl<ArrayBuffer | null>(null),
      tipo: new FormControl<string>('image/png'),
      monto: new FormControl<number | null>({ value: 0.0, disabled: true }),
      metodo_pago: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.pagoForm.get('metodo_pago')?.valueChanges.subscribe((val) => {
      let monto = 0.0;
      this.rolService.obtenerRolPorNombre(this.usuario.roles).subscribe(
        (rol) => {
          if (val.value === 'diario') {
            monto = Number(rol.monto_pago) * 1;
          }
          if (val.value === 'mensual') {
            const fechaActual = new Date();
            const fecha = new Date(fechaActual); // Create a copy of fechaActual
            fecha.setMonth(fechaActual.getMonth() + 1);
            const fechaFin = new Date(fecha);
            const diasRestantes = Math.ceil(
              (fechaFin.getTime() - fechaActual.getTime()) /
              (1000 * 60 * 60 * 24)
            );
            monto = Number(rol.monto_pago) * diasRestantes;
          }
          this.pagoForm.patchValue({ monto: monto });
        },
        (error) => {
          console.log(error);
        }
      );
      monto = 0.0;
    });
  }

  // Método para validar el formulario (puede ser llamado desde el componente padre)
  validateForm(): boolean {
    if (this.pagoForm.invalid) {
      let errors: { [key: string]: string } = {};
      Object.keys(this.pagoForm.controls).forEach((key) => {
        const control = this.pagoForm.get(key);
        errors = {
          ...errors,
          ...(this.validatedForm(key, control) as { [key: string]: string }),
        };
      });
      this.pagoForm.setErrors(errors);
      return false;
    }
    return true;
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
