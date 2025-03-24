import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { RutinasService } from '../../../service/rutinas/rutinas.service';
import { Router } from '@angular/router';

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
    private router: Router,
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.obtenerDatos();
    this.items = [

      {
        label: 'Editar',
        icon: 'edit',
        action: async (id: string) => {
          await this.showDialog(id);
        }
      },
      {
        label: 'Eliminar',
        icon: 'delete',
        action: (id: string) => {
          this.confirm(id);
        }
      }

    ];
  }

  obtenerDatos() {
    this.rutinaService.obtenerRutinas().subscribe({
      next: (data) => {
        console.log(data);
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

  confirm(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Ejercicio',
      message: 'El ejercicio se eliminará de forma permanente',
      accept: () => {
        this.rutinaService.eliminarRutina(id).subscribe({
          next: () => {
            this.obtenerDatos();
            this.messageService.add({ severity: 'success', summary: 'Ejercicio eliminado', detail: `Ejercicio eliminado con éxito` });
          }
        });
      },
      reject: () => { }
    });
  }

  details(id: string) { 
    this.router.navigate(['/admin/rutinas', id]);
  }
}


