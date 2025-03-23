import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  styleUrls: ['./table-horario-entrenador.component.scss']
})
export class TableHorarioEntrenadorComponent implements OnInit {
  horarioForm: FormGroup;
  visible: boolean = false;

  horas = [
    { name: '08:00', value: '08:00' },
    { name: '09:00', value: '09:00' },
    { name: '10:00', value: '10:00' },
    { name: '11:00', value: '11:00' },
    { name: '12:00', value: '12:00' },
    { name: '13:00', value: '13:00' },
    { name: '14:00', value: '14:00' },
    { name: '15:00', value: '15:00' },
    { name: '16:00', value: '16:00' },
    { name: '17:00', value: '17:00' },
    { name: '18:00', value: '18:00' },
    { name: '19:00', value: '19:00' },
    { name: '20:00', value: '20:00' }
  ];

  dias = [
    { name: 'Lunes', value: 'Lunes' },
    { name: 'Martes', value: 'Martes' },
    { name: 'Miércoles', value: 'Miercoles' },
    { name: 'Jueves', value: 'Jueves' },
    { name: 'Viernes', value: 'Viernes' }
  ]

  jornada = [
    { name: 'Matutina', value: 'Matutina' },
    { name: 'Vespertina', value: 'Vespertina' }
  ]

  horasSalida: any[] = [...this.horas];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private horarioEntrenadorService: HorariosEntrenadoresService, private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.horarioForm = this.fb.group(formInit);
   }

  horarios: any = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.horarioForm.get('franja_hora_inicio')?.valueChanges.subscribe((val) => {
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
      console.log(data);
      this.horarios = data;
    });
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Ejercicio',
      message: 'El ejercicio se eliminará de forma permanente',
      accept: () => {
        this.horarioEntrenadorService.eliminarHorario(id).subscribe({
          next: () => {
            this.obtenerDatos();
            this.messageService.add({ severity: 'success', summary: 'Ejercicio eliminado', detail: 'Ejercicio eliminado con éxito' });
          }
        });
      },
      reject: () => { }
    });
  }

  onSubmit() {
    const horario = this.horarioForm.value;
    this.horarioEntrenadorService.actualizarHorario({
      id: horario.id,
      fecha: horario.fecha && new Date(horario.fecha).toISOString(),
      franja_hora_inicio: horario.franja_hora_inicio && horario.franja_hora_inicio.value,
      franja_hora_fin: horario.franja_hora_fin && horario.franja_hora_fin.value,
      dia_semana: horario.dia_semana && horario.dia_semana.value
    }).subscribe({
      next: (data) => {
        // this.addedHorarioEntrenador.emit();
        this.horarioForm.reset(formInit);
        this.obtenerDatos();
        this.visible = false;
      },
      error: (error) => {
        console.error(error);
        this.horarioForm.setErrors(error.error.errors);
      }
    });
  }

  async showDialog(id: string) {
    const horario = await this.horarioEntrenadorService.obtenerhorario(id).toPromise();
    console.log(horario);
    this.horarioForm.patchValue({
      id: horario.id,
      franja_hora_inicio: this.horas.find((hora) => hora.value === horario.franja_hora_inicio.slice(0, 5)),
      franja_hora_fin: this.horas.find((hora) => hora.value === horario.franja_hora_fin.slice(0, 5)),
      dia_semana: this.dias.find((dia) => dia.value === horario.dia_semana),
      fecha: new Date(horario.fecha),
    });
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
    this.horarioForm.reset(formInit);
  }
}

