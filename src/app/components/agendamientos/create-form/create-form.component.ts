import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormService } from '../../../service/agendamiento/form-service.service';
import { MembresiaService } from '../../../service/membresias/membresia.service';
import { AgendamientoInfoComponent } from './agendamiento-info/agendamiento-info.component';
import { PagoFormComponent } from './pago-form/pago-form.component';
import { ConfirmComponent } from './confirm/confirm.component';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements AfterViewInit {
  @ViewChild(AgendamientoInfoComponent) agendamientoComponent!: AgendamientoInfoComponent
  @ViewChild(PagoFormComponent) pagoComponent!: PagoFormComponent
  @ViewChild(ConfirmComponent) confirmComponent!: ConfirmComponent
  usuario: any;
  rol!: string;
  items: MenuItem[] = [];
  activeIndex: number = 0;

  // Almacenar el estado de validación de cada paso
  stepValidation: { [key: number]: boolean } = {
    0: false, // Agendamiento
    1: false, // Pago
    2: true, // Confirmación (siempre válido)
  }

  constructor(
    private membresiaService: MembresiaService,
    private formDataService: FormService,
    private messageService: MessageService
  ) {   }

  ngOnInit() {
    this.items = [
      { label: 'agendamiento' },
      { label: 'Pago' },
      { label: 'Confirmación' },
      { label: 'Finalizar' }
    ];
    let session = sessionStorage.getItem('session-usuario');
    this.usuario = session ? JSON.parse(session) : null;
    this.rol = this.usuario.roles;
  }

  ngAfterViewInit() {
    // Inicializar la validación después de que los componentes hijos estén disponibles
    setTimeout(() => {
      // Validar el paso inicial
      this.validateCurrentStep()
    })
  }

  next() {
    if (this.validateCurrentStep()) {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++
        // Validar el nuevo paso después de cambiar
        setTimeout(() => this.validateCurrentStep())
      }
    } else {
      // Mostrar mensaje de error si la validación falla
      this.showValidationError()
    }
  }

  prev() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  validateCurrentStep(): boolean {
    // Validación específica para cada paso
    switch (this.activeIndex) {
      case 0: // Agendamiento
        if (this.agendamientoComponent) {
          const isValid = this.agendamientoComponent.validateForm()
          this.stepValidation[0] = isValid
          return isValid
        }
        return false

      case 1: // Pago
        if (this.pagoComponent) {
          const isValid = this.pagoComponent.validateForm()
          this.stepValidation[1] = isValid
          return isValid
        }
        return false

      case 2: // Confirmación
        // La confirmación siempre es válida, solo muestra datos
        this.stepValidation[2] = true
        this.confirmComponent.obtenerDatosCompletos();
        return true

      default:
        return false
    }
  }

  // Verificar si todos los pasos anteriores son válidos
  areAllPreviousStepsValid(): boolean {
    for (let i = 0; i < this.activeIndex; i++) {
      if (!this.stepValidation[i]) {
        return false
      }
    }
    return true
  }

  showValidationError() {
    switch (this.activeIndex) {
      case 0:
        this.messageService.add({ severity: 'warn', summary: '¡Aviso!', detail: 'Por favor complete los campos de agendamiento' });
        break
      case 1:
        this.messageService.add({ severity: 'warn', summary: '¡Aviso!', detail: 'Por favor complete todos los campos de pago.' });
        break
      default:
        this.messageService.add({ severity: 'warn', summary: '¡Aviso!', detail: 'Por favor complete todos los campos.' });
    }

  }

  finalizar() {
    // Verificar que todos los pasos anteriores sean válidos
    if (!this.areAllPreviousStepsValid()) {
      alert("Por favor complete todos los pasos anteriores correctamente antes de finalizar.")
      return
    }

    // Verificar el paso actual
    if (this.validateCurrentStep()) {
      // this.isSubmitting = true

      // Obtener todos los datos del formulario
      const allFormData = this.formDataService.getAllFormData()

      // Enviar datos al backend
      // this.submissionService.submitFormData(allFormData).subscribe({
      //   next: (response) => {
      //     this.isSubmitting = false
      //     alert("Proceso finalizado con éxito")
      //     this.formDataService.clearAllData() // Limpiar datos después de enviar
      //     // Aquí puedes redirigir o mostrar un mensaje de éxito
      //   },
      //   error: (error) => {
      //     this.isSubmitting = false
      //     console.error("Error al enviar datos:", error)
      //     alert("Error al finalizar el proceso. Por favor, intente nuevamente.")
      //   },
      // })
    } else {
      this.showValidationError()
    }
  }
}
