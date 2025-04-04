import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EquiposService } from 'src/app/service/equipo/equipo.service';
import { Estados } from '../../../pages/admin/equipos/equipos.component';
import { AuthService } from '../../../pages/login/auth.service';

@Component({
  selector: 'app-table-maquina',
  templateUrl: './table-maquina.component.html',
  styleUrls: ['./table-maquina.component.scss']
})
export class TableMaquinaComponent implements OnInit {
  authorize: boolean = true;
  emptyMessage: string = 'Cargando equipos...';
  visible: boolean = false;
  @ViewChild('dt') dt!: Table;
  maquinaForm: FormGroup;
  estadosOpt = [
    { name: 'Disponible', code: 'Disponible' },
    { name: 'Mantenimiento', code: 'Mantenimiento' },
    { name: 'Fuera de Servicio', code: 'Fuera de servicio' },
  ];

  constructor(
    private equipoService: EquiposService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.authorize = this.authService.getUserData()?.roles === 'Entrenador' ? false : true

    this.maquinaForm = this.fb.group({
      id: new FormControl<string | null>(null),
      cantidad: new FormControl<number | null>(1),
      estado: new FormControl<Estados | null>(null),
      nombre: new FormControl<string | null>(null),
      fecha_compra: new FormControl<Date | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }

  updatedMaquina() {
    try {
      const upMaquina = this.maquinaForm.value;
      console.log(upMaquina);
      this.equipoService.actualizarMaquina({
        id: upMaquina.id,
        cantidad: upMaquina.cantidad,
        estado: upMaquina.estado && upMaquina.estado.code,
        nombre: upMaquina.nombre,
        fecha_compra: upMaquina.fecha_compra && new Date(upMaquina.fecha_compra).toISOString(),
        descripcion: upMaquina.descripcion,
      }).subscribe({
        next: () => {
          this.maquinaForm.reset({
            id: null,
            cantidad: 1,
            estado: null,
            nombre: null,
            fecha_compra: null,
            descripcion: null,
          });
          this.obtenerDatos();
          this.visible = false;
        },
        error: (error) => {
          console.log('Error al enviar los datos', error.error.errors);
          this.maquinaForm.setErrors(error.error.errors);
        }
      });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }

  openDialog(id: string) {
    this.equipoService.obtenerMaquina(id)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.maquinaForm.patchValue({
            id: data.id,
            nombre: data.nombre,
            cantidad: Number(data.cantidad),
            estado: this.estadosOpt.find((estado) => estado.code === data.estado),
            fecha_compra: new Date(data.fecha_compra),
            descripcion: data.descripcion,
          });
          this.visible = true;
        },
        error: (error) => {
          console.log('Error al obtener los datos', error);
        },
      });
  }

  hideDialog() {
    this.visible = false;
  }

  maquinas = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  goToMantenimiento() {
    this.router.navigate(['/admin/equipos/mantenimiento']);
  }

  goToRegistrar() {
    this.router.navigate(['/admin/equipos/registrar']);
  }

  obtenerDatos() {
    this.equipoService
      .obtenerDatos()
      .subscribe({
        next: (data: any) => {
          this.maquinas = data;
          if (this.maquinas.length === 0) {
            this.emptyMessage = 'No hay equipos registrados';
          }
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
          if (error.status === 401) {
            this.emptyMessage = 'No tiene permisos para ver equipos registrados';
            console.error('Error -> ', error.status);
          } else if (error.status === 500) {
            this.emptyMessage = 'No se pudo obtener los equipos';
            console.error('Error -> ', error.status);
          }
          this.emptyMessage = 'No se pudo obtener los equipos';
          console.error('Error -> ', error.status);
        },

      });
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = '';  // Limpia el input
    if (this.dt) {
      this.dt.clear();  // Limpia los filtros de la tabla
    }
  }

  goToHistorial(id: string) {
    this.router.navigate(['/admin/equipos/' + id + '/historial']);
  }
}