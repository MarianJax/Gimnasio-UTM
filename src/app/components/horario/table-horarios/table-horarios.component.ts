import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HorarioService } from '../../../service/horarios/horario.service';
import { TarifasService } from '../../../service/tarifas/tarifas.service';
import { Estados } from '../../agendamientos/create-form/agendamiento-info/agendamiento-info.component';

const formInit = {
  id: new FormControl<string | null>(null),
  rol_id: new FormControl<Estados[] | null>([]),
  hora_inicio: new FormControl<Estados | null>(null),
  hora_fin: new FormControl<Estados | null>(null),
  dia_semana: new FormControl<Estados | null>(null),
  jornada: new FormControl<Estados | null>(null),
};

@Component({
  selector: 'app-table-horarios',
  templateUrl: './table-horarios.component.html',
  styleUrls: ['./table-horarios.component.scss'],
})
export class TableHorariosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  horarioForm: FormGroup;
  visible: boolean = false;
  roles: { name: string; code: string }[] = [];

  getHours() {
    const hours = [];
    for (let h = 5; h <= 20; h++) {
      const hourStr = h.toString().padStart(2, '0') + ':00';
      hours.push({ name: hourStr, value: hourStr });
    }

    return hours;
  }

  horas = this.getHours();

  dias = [
    { name: 'Lunes', value: 'Lunes' },
    { name: 'Martes', value: 'Martes' },
    { name: 'Miércoles', value: 'Miercoles' },
    { name: 'Jueves', value: 'Jueves' },
    { name: 'Viernes', value: 'Viernes' },
  ];

  jornada = [
    { name: 'Matutina', value: 'Matutina' },
    { name: 'Vespertina', value: 'Vespertina' },
  ];
  horasSalida: any[] = [...this.horas];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private horarioService: HorarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private tarifaService: TarifasService
  ) {
    this.horarioForm = this.fb.group(formInit);
  }

  horarios: any = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.horarioForm.get('hora_inicio')?.valueChanges.subscribe((val) => {
      const horaIngresoIndex = this.horas.findIndex(
        (hora) => hora.value === val?.value
      );

      if (horaIngresoIndex >= 0) {
        this.horasSalida = this.horas.slice(horaIngresoIndex + 1);
      } else {
        this.horasSalida = [...this.horas];
      }
    });

    this.tarifaService.obtenerTarifas().subscribe((roles) => {
      roles.map((rol: any) => {
        if (rol.nombre !== 'ENTRENADOR' && rol.nombre !== 'ADMINITRADOR GYM') {
          this.roles.push({ name: rol.rol_id, code: rol.id });
          console.log('rol',rol);
        }
      });
    });
    this.obtenerDatos();
  }

  goToMantenimiento() {
    this.router.navigate(['/admin/equipos/mantenimiento']);
  }

  AddMaquina() {
    this.router.navigate(['/admin/equipos/registrar']);
  }

  obtenerDatos() {
    this.horarioService.obtenerHorarios().subscribe((data) => {
      console.log('horarios', data);
      this.horarios = data;
    });
  }

  deleteHorario(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Horario',
      message: 'El horario se eliminará de forma permanente',
      // acceptIcon: "none",
      // rejectIcon: "none",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-success mr-4 p-button-outlined',
      acceptButtonStyleClass: 'p-button-danger p-button-outlined',
      accept: () => {
        this.horarioService.eliminarHorario(id).subscribe({
          next: () => {
            this.obtenerDatos();
            this.messageService.add({
              severity: 'success',
              summary: 'Horario eliminado',
              detail: 'Horario eliminado con éxito',
            });
          },
        });
      },
      reject: () => {},
    });
  }

  showDialog(id: string) {
    this.horarioService.obtenerhorario(id).subscribe({
      next: (horario) => {
        console.log('horario', horario);
        this.horarioForm.patchValue({
          id: horario.id,
          rol_id: this.roles.find((rol) => rol.code === horario.distribucion.id),
          hora_inicio: this.horas.find(
            (hora) => hora.value === horario.hora_inicio.slice(0, 5)
          ),
          hora_fin: this.horas.find(
            (hora) => hora.value === horario.hora_fin.slice(0, 5)
          ),
          dia_semana: this.dias.filter(dia => horario.dia_semana.includes(dia.value)),
          jornada: this.jornada.find(
            (jornada) => jornada.value === horario.jornada
          ),
        });
    this.visible = true;
      },
      error: (error) => {
        console.error('Error al obtener el horario', error);
    } });
  }

  closedDialog() {
    this.visible = false;
    this.horarioForm.reset({
      rol_id: null,
      hora_inicio: null,
      hora_fin: null,
      dia_semana: null,
      jornada: null,
    });
  }

  onSubmit() {
    const horario = this.horarioForm.value;

    this.horarioService
      .actualizarHorario({
        id: horario.id,
        rol_id: horario.rol_id.code,
        hora_inicio: horario.hora_inicio.value,
        hora_fin: horario.hora_fin.value,
        dia_semana: horario.dia_semana.map((dia: any) => dia.value),
        jornada: horario.jornada.value,
      })
      .subscribe({
        next: () => {
          this.horarioForm.reset(formInit);
          this.visible = false;
          this.obtenerDatos();
        },
        error: (error) => {
          console.error('Error al enviar los datos', error);
          this.horarioForm.setErrors(error.error.errors);
        },
      });
  }

  getDias(array_dia: string[]) {
    const dias = array_dia.map((dia) => dia).join(', ');
    return dias;
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = ''; // Limpia el input
    if (this.dt) {
      this.dt.clear(); // Limpia los filtros de la tabla
    }
  }
}
