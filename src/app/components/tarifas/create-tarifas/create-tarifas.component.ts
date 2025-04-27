import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TarifasService } from '../../../service/tarifas/tarifas.service';

export const FormInit = {
  nombre: null,
  monto_pago: null,
  tiempo: null,
  cupo: null,
}

@Component({
  selector: 'app-create-tarifas',
  templateUrl: './create-tarifas.component.html',
  styleUrls: ['./create-tarifas.component.scss']
})
export class CreateTarifasComponent implements OnInit {
  rolForm: FormGroup;
  visible: boolean = false;
  @Output() addedRol = new EventEmitter<void>();

  showDialog() {
    this.visible = true;
  }

  closedDialog() {
    this.rolForm.reset(FormInit);
    this.visible = false;
  }

  constructor(private fb: FormBuilder, private tarifasService: TarifasService) {
    this.rolForm = this.fb.group({
      rol_id: new FormControl<string | null>(null),
      pago_diario: new FormControl<number | null>(null),
      pago_mensual: new FormControl<number | null>(null),
      tiempo: new FormControl<number | null>(null),
      cupo: new FormControl<number | null>(null),
    });
  }

  ngOnInit() { }

  addRol() {
    try {
      const rol = this.rolForm.value;
      this.tarifasService.agregarRol(rol)
        .subscribe({
          next: () => {
            this.addedRol.emit();
            this.visible = false;
            this.rolForm.reset(FormInit);
          },
          error: (error: any) => {
            console.log('Error al enviar los datos', error.error.errors);
            this.rolForm.setErrors(error.error.errors);
          }
        })
        
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }
}

