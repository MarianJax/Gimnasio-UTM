import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RutinasService } from '../../../service/rutinas/rutinas.service';

const formInit = {
  nombre: null,
  intensidad: null,
  descripcion: null
};

@Component({
  selector: 'app-create-form-rutina',
  templateUrl: './create-form-rutina.component.html',
  styleUrls: ['./create-form-rutina.component.scss']
})
export class CreateFormRutinaComponent implements OnInit {
  rutinaForm: FormGroup;
  visible: boolean = false;

  Intensidad = [
    { name: 'Alto', value: 'alto' },
    { name: 'Normal', value: 'normal' },
    { name: 'Bajo', value: 'bajo' }
  ]

  constructor(private fb: FormBuilder, private rutinaService: RutinasService) {
    this.rutinaForm = this.fb.group({
      nombre: new FormControl<string | null>(null),
      intensidad: new FormControl<{ name: string, value: string } | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }

  showDialog() {
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
    this.rutinaForm.reset(formInit);
  }

  ngOnInit(): void {

  }

  @Output() rutinaAgregada = new EventEmitter<void>();

  addRutina() {
    const { intensidad, ...data } = this.rutinaForm.value || {};
    this.rutinaService.agregarRutina({ intensidad: intensidad?.value, ...data }).subscribe({
      next: () => {
        this.rutinaAgregada.emit();
        this.rutinaForm.reset(formInit);
        this.visible = false;
      },
      error: (error) => {
        this.rutinaForm.setErrors(error.error.errors)
        // console.error(error);
      }
    });
  }
}

