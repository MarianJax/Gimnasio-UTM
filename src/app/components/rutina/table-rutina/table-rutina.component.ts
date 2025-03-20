import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RutinasService } from '../../../service/rutinas/rutinas.service';

@Component({
  selector: 'app-table-rutina',
  templateUrl: './table-rutina.component.html',
  styleUrls: ['./table-rutina.component.scss']
})
export class TableRutinaComponent implements OnInit {
  updatedRutinaForm: FormGroup;
  visible: boolean = false;
  rutina: any = undefined;

  selectedIntensidad: {
    nombre: string;
    id: string;
  }[] | null = null;

  Intensidad = [
    { name: 'Alto', value: 'alto' },
    { name: 'Normal', value: 'normal' },
    { name: 'Bajo', value: 'bajo' }
  ]

  async showDialog(id: string) {    
    this.rutina = await this.rutinaService.obtenerRutina(id).toPromise();
    this.updatedRutinaForm.patchValue({
      id: this.rutina.id,
      nombre: this.rutina.nombre,
      intensidad: this.Intensidad.find((intensidad) => intensidad.value === this.rutina.intensidad),
      descripcion: this.rutina.descripcion,
    });
    
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
  }

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinasService,
  ) {
    this.updatedRutinaForm = this.fb.group({
      id: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      intensidad: new FormControl<string | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }

  rutinas: any = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.rutinaService.obtenerRutinas().subscribe({
      next: (data) => {
        this.rutinas = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateRutina() { 
    const { intensidad, ...data } = this.updatedRutinaForm.value || {};
    this.rutinaService.actualizarRutina({ intensidad: intensidad?.value, ...data }).subscribe({
      next: () => {
        this.updatedRutinaForm.reset();
        this.obtenerDatos();
        this.visible = false;
      },
      error: (error) => {
        this.updatedRutinaForm.setErrors(error.error.errors)
        console.error(error);
      }
    });
  }
}


