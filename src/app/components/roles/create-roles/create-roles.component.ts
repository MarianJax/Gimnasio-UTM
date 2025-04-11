import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../../service/roles/roles.service';

export const FormInit = {
  nombre: null,
  monto_pago: null,
  tiempo: null,
  cupo: null,
}

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private rolesService: RolesService) {
    this.rolForm = this.fb.group({
      nombre: new FormControl<string | null>(null),
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
      this.rolesService.agregarRol(rol)
        .subscribe({
          next: () => {
            this.addedRol.emit();
            this.visible = false;
            this.rolForm.reset(FormInit);
          },
          error: (error) => {
            console.log('Error al enviar los datos', error.error.errors);
            this.rolForm.setErrors(error.error.errors);
          }
        })
        
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }
}

