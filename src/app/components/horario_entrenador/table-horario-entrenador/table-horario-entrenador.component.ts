import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HorariosEntrenadoresService } from '../../../service/horariosEntrenadores/horarios-entrenadores.service';
import { Estados } from '../../agendamientos/create-form/agendamiento-info/agendamiento-info.component';

const formInit = {
  id: new FormControl<string | null>(null),
  fecha: new FormControl<Date | null>(null),
  franja_hora_inicio: new FormControl<Estados | null>(null),
  franja_hora_fin: new FormControl<Estados | null>(null),
  dia_semana: new FormControl<Estados | null>(null),
};

@Component({
  selector: 'app-table-horario-entrenador',
  templateUrl: './table-horario-entrenador.component.html',
  styleUrls: ['./table-horario-entrenador.component.scss'],
})
export class TableHorarioEntrenadorComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  horarioForm: FormGroup;
  visible: boolean = false;

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
    private horarioEntrenadorService: HorariosEntrenadoresService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.horarioForm = this.fb.group(formInit);
  }

  horarios: any = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.horarioForm
      .get('franja_hora_inicio')
      ?.valueChanges.subscribe((val) => {
        const horaIngresoIndex = this.horas.findIndex(
          (hora) => hora.value === val?.value
        );

        if (horaIngresoIndex >= 0) {
          this.horasSalida = this.horas.slice(horaIngresoIndex + 1);
        } else {
          this.horasSalida = [...this.horas];
        }
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
    this.horarioEntrenadorService.obtenerHorarios().subscribe((data) => {
      this.horarios = data;
    });
  }

  deleteHorarioEntrenador(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Ejercicio',
      message: 'El ejercicio se eliminará de forma permanente',
      accept: () => {
        this.horarioEntrenadorService.eliminarHorario(id).subscribe({
          next: () => {
            this.obtenerDatos();
            this.messageService.add({
              severity: 'success',
              summary: 'Ejercicio eliminado',
              detail: 'Ejercicio eliminado con éxito',
            });
          },
        });
      },
      reject: () => {},
    });
  }

  onSubmit() {
    const horario = this.horarioForm.value;
    this.horarioEntrenadorService
      .actualizarHorario({
        id: horario.id,
        fecha: horario.fecha && new Date(horario.fecha).toISOString(),
        franja_hora_inicio:
          horario.franja_hora_inicio && horario.franja_hora_inicio.value,
        franja_hora_fin:
          horario.franja_hora_fin && horario.franja_hora_fin.value,
        dia_semana: horario.dia_semana && horario.dia_semana.value,
      })
      .subscribe({
        next: (data) => {
          // this.addedHorarioEntrenador.emit();
          this.horarioForm.reset(formInit);
          this.obtenerDatos();
          this.visible = false;
        },
        error: (error) => {
          console.error(error);
          this.horarioForm.setErrors(error.error.errors);
        },
      });
  }

  async showDialog(id: string) {
    const horario = await this.horarioEntrenadorService
      .obtenerhorario(id)
      .toPromise();
    this.horarioForm.patchValue({
      id: horario.id,
      franja_hora_inicio: this.horas.find(
        (hora) => hora.value === horario.franja_hora_inicio.slice(0, 5)
      ),
      franja_hora_fin: this.horas.find(
        (hora) => hora.value === horario.franja_hora_fin.slice(0, 5)
      ),
      dia_semana: this.dias.find((dia) => dia.value === horario.dia_semana),
      fecha: new Date(horario.fecha),
    });
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
    this.horarioForm.reset(formInit);
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
