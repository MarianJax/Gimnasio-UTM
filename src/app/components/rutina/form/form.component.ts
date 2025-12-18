import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RutinasService } from '../../../service/rutinas/rutinas.service';

@Component({
  selector: 'app-form-rutina',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() addedRutinaForm = new EventEmitter<void>();
  rutinaForm: FormGroup;

  constructor(
    private rutinaService: RutinasService,
    private fb: FormBuilder,
  ) {
    this.rutinaForm = this.fb.group({
      url: new FormControl<string | null>(null),
    });
  }

  addRutina() {
    try {
      const newMaquina = this.rutinaForm.value;
      this.rutinaService
        .agregarRutina({
          url: newMaquina.url,
        })
        .subscribe({
          next: (response) => {
            this.addedRutinaForm.emit();
            this.rutinaForm.reset({url: null});
          },
          error: (error) => {
            console.log('Error al enviar los datos', error.error.errors);
            this.rutinaForm.setErrors(error.error.errors);
          },
        });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }

  ngOnInit(): void {}
}
