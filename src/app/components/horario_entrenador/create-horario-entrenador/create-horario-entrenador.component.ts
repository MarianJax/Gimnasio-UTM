import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HorariosEntrenadoresService } from '../../../service/horariosEntrenadores/horarios-entrenadores.service';
import { Estados } from '../../agendamientos/create-form/agendamiento-info/agendamiento-info.component';

const formInit = {
  fecha: new FormControl<Date | null>(null),
  franja_hora_inicio: new FormControl<Estados | null>(null),
  franja_hora_fin: new FormControl<Estados | null>(null),
  dia_semana: new FormControl<Estados | null>(null),
};

@Component({
  selector: 'app-create-horario-entrenador',
  templateUrl: './create-horario-entrenador.component.html',
  styleUrls: ['./create-horario-entrenador.component.scss']
})
export class CreateHorarioEntrenadorComponent implements OnInit {
  @Output() addedHorarioEntrenador = new EventEmitter<void>();
  horarioForm: FormGroup;

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

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(private fb: FormBuilder, private horarioEntrenadorService: HorariosEntrenadoresService) {
    this.horarioForm = this.fb.group(formInit);
  }

  ngOnInit() {
    // Suscribirse a los cambios del campo 'franja_hora_inicio'
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
  }

  onSubmit() {
    const horario = this.horarioForm.value;
    console.log(horario);
    this.horarioEntrenadorService.agregarHorario({
      fecha: horario.fecha && new Date(horario.fecha).toISOString(),
      franja_hora_inicio: horario.franja_hora_inicio && horario.franja_hora_inicio.value,
      franja_hora_fin: horario.franja_hora_fin && horario.franja_hora_fin.value,
      dia_semana: horario.dia_semana && horario.dia_semana.value
    }).subscribe({
      next: (data) => {
        this.addedHorarioEntrenador.emit();
        this.horarioForm.reset(formInit);
      },
      error: (error) => {
        console.error(error);
        this.horarioForm.setErrors(error.error.errors);
      }
    });
  }
}
