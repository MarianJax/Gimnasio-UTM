import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../pages/login/auth.service';
import { AgendamientosService } from '../../../service/agendamiento/agendamientos.service';
import { FormService } from '../../../service/agendamiento/form-service.service';
import { AgendamientoInfoComponent } from './agendamiento-info/agendamiento-info.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PagoFormComponent } from './pago-form/pago-form.component';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements AfterViewInit {
  @ViewChild(AgendamientoInfoComponent)
  agendamientoComponent!: AgendamientoInfoComponent;
  @ViewChild(PagoFormComponent) pagoComponent!: PagoFormComponent;
  @ViewChild(ConfirmComponent) confirmComponent!: ConfirmComponent;
  usuario: any;
  rol!: string;
  items: MenuItem[] = [];
  activeIndex: number = 0;
  dataAction!: { status: string; message: string };

  // Almacenar el estado de validación de cada paso
  stepValidation: { [key: number]: boolean } = {
    0: false, // Agendamiento
    1: false, // Pago
    2: true, // Confirmación (siempre válido)
  };

  constructor(
    private agendamientoService: AgendamientosService,
    private formDataService: FormService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
    let session = sessionStorage.getItem('session-usuario');
    this.usuario = session ? JSON.parse(session) : null;
  }

  ngOnInit() {
    this.items = [
      { label: 'agendamiento' },
      { label: 'Pago' },
      { label: 'Confirmación' },
      { label: 'Finalizar' },
    ];
  }

  ngAfterViewInit() {
    // Inicializar la validación después de que los componentes hijos estén disponibles
    setTimeout(() => {
      // Validar el paso inicial
      this.validateCurrentStep();
    }, 500);
  }

  next() {
    if (this.validateCurrentStep()) {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
        // Validar el nuevo paso después de cambiar
        setTimeout(() => this.validateCurrentStep());
      }
    } else {
      // Mostrar mensaje de error si la validación falla
      this.showValidationError();
    }
  }

  

  prev() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  validateCurrentStep(): boolean {
    const horas = this.agendamientoComponent.agendarForm
      .get('hora')
      ?.getRawValue();
    const [hora_inicio, hora_fin] = horas ? horas.split(' - ') : ['', ''];
    // Validación específica para cada paso
    switch (this.activeIndex) {
      case 0: // Agendamiento
        if (this.agendamientoComponent) {
          const isValid = this.agendamientoComponent.validateForm();
          this.stepValidation[0] = isValid;
          return isValid;
        }
        return false;

      case 1: // Pago
        if (this.pagoComponent) {
          const isValid = this.pagoComponent.validateForm();
          this.stepValidation[1] = isValid;
          return isValid;
        }
        return false;

      case 2: // Confirmación
        // La confirmación siempre es válida, solo muestra datos
        this.stepValidation[2] = true;
        const info = [
          {
            title: 'Agendamiento',
            icon: 'calendar',
            data: {
              ingreso: hora_inicio,
              salida: hora_fin,
              fecha: this.agendamientoComponent.agendarForm
                .get('fecha')
                ?.getRawValue(),

            },
          },
          {
            title: 'Pago',
            icon: 'dollar-01',
            data: {
              ...this.pagoComponent.pagoForm.value,
              monto: this.pagoComponent.pagoForm.get('monto')?.getRawValue(), // Obtener el valor de un campo deshabilitado
            },
          },
        ];
        this.confirmComponent.obtenerDatosCompletos(info);
        return true;

      case 3: // Finalizar
        const user = this.authService.getUserData();
        let ret: boolean = false;
        const uint8Array = new Uint8Array(this.pagoComponent.pagoForm
          .get('evidencia_pago_buffer')
          ?.getRawValue());
        const array = Array.from(uint8Array);
        this.agendamientoService
          .crearAgendamiento({
            fecha: this.agendamientoComponent.agendarForm
              .get('fecha')
              ?.getRawValue()
              .toISOString(),
            hora_inicio,
            hora_fin,
            distribucion: user.rol,
            tipo: this.pagoComponent.pagoForm.get('tipo')?.getRawValue(),
            usuario_id: user.id,
            metodo_pago: (this.pagoComponent.pagoForm
              .get('metodo_pago')
              ?.getRawValue()).name,
            monto: this.pagoComponent.pagoForm.get('monto')?.getRawValue(),
            evidencia_pago: array,
            facu_id: this.agendamientoComponent.agendarForm
              .get('facultad')
              ?.getRawValue() && (this.agendamientoComponent.agendarForm
                .get('facultad')
                ?.getRawValue()).code,
            carr_id: this.agendamientoComponent.agendarForm.get('carrera')?.getRawValue() && (this.agendamientoComponent.agendarForm.get('carrera')?.getRawValue()).code,
            dep_id: this.agendamientoComponent.agendarForm
              .get('departamento')
              ?.getRawValue() && (this.agendamientoComponent.agendarForm
                .get('departamento')
                ?.getRawValue()).code,
          })
          .subscribe({
            next: (data: any) => {
              if (data.status === 'error') {
                this.dataAction = {
                  status: data.status,
                  message: data.message.message,
                };

              } else {
                this.dataAction = data;

              }
              ret = true;
              return ret;
            },
            error: (err) => {
              console.log(err);
              ret = false;
              this.dataAction = err;
              return ret;
            },
          });

        return ret;

      default:
        return false;
    }
  }

  // Verificar si todos los pasos anteriores son válidos
  areAllPreviousStepsValid(): boolean {
    for (let i = 0; i < this.activeIndex; i++) {
      if (!this.stepValidation[i]) {
        return false;
      }
    }
    return true;
  }

  showValidationError() {
    switch (this.activeIndex) {
      case 0:
        this.messageService.add({
          severity: 'warn',
          summary: '¡Aviso!',
          detail: 'Por favor complete los campos de agendamiento',
        });
        break;
      case 1:
        this.messageService.add({
          severity: 'warn',
          summary: '¡Aviso!',
          detail: 'Por favor complete todos los campos de pago.',
        });
        break;
      default:
        this.messageService.add({
          severity: 'warn',
          summary: '¡Aviso!',
          detail: 'Por favor complete todos los campos.',
        });
    }
  }

  finalizar() {
    // Verificar que todos los pasos anteriores sean válidos
    if (!this.areAllPreviousStepsValid()) {
      alert(
        'Por favor complete todos los pasos anteriores correctamente antes de finalizar.'
      );
      return;
    }
  }
}
