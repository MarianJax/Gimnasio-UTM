import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RutinasService } from '../../../service/rutinas/rutinas.service';

@Component({
  selector: 'app-create-form-rutina',
  templateUrl: './create-form-rutina.component.html',
  styleUrls: ['./create-form-rutina.component.scss']
})
export class CreateFormRutinaComponent {
  visible: boolean = false;

  Intensidad = [
    { name: 'Alto', value: 'alto' },
    { name: 'Normal', value: 'normal' },
    { name: 'Bajo', value: 'bajo' }
  ]

  constructor(private fb: FormBuilder, private rutinaService: RutinasService) { }

  rutinaForm = this.fb.group({
    nombre: [''],
    intensidad: [{ name: 'Normal', value: 'normal' }],
    descripcion: [''],
  });

  showDialog() {
    console.log('Abre dialogo');
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
  }

  @Output() rutinaAgregada = new EventEmitter<void>();

  addRutina() {
    const { intensidad, ...data } = this.rutinaForm.value || {};
    this.rutinaService.agregarRutina({ intensidad: intensidad?.value, ...data }).subscribe({
      next: () => {
        this.rutinaAgregada.emit();
        this.rutinaForm.reset();
        this.visible = false;
      },
      error: (error) => {
        this.rutinaForm.setErrors(error.error.errors)
        console.error(error);
      }
    });
  }
}

