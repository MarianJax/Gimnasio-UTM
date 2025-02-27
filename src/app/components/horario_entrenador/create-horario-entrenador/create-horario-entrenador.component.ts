import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Estados } from '../../agendamientos/create-form/agendamiento-info/agendamiento-info.component';

@Component({
  selector: 'app-create-horario-entrenador',
  templateUrl: './create-horario-entrenador.component.html',
  styleUrls: ['./create-horario-entrenador.component.scss']
})
export class CreateHorarioEntrenadorComponent implements OnInit {
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

  roles = [
    { name: 'Administrador', code: 'Administrador' },
    { name: 'Estudiante', code: 'Estudiante' },
    { name: 'Funcionario', code: 'Funcionario' },
    { name: 'Entrenador', code: 'Entrenador' }
  ];

  horasSalida: any[] = [...this.horas];

  onHoraIngresoChange() {
    const horaIngresoIndex = this.horas.findIndex(hora => hora === this.horarioForm.get('ingreso')?.value);

    if (horaIngresoIndex >= 0) {
      this.horasSalida = this.horas.slice(horaIngresoIndex + 1);
    } else {
      this.horasSalida = [...this.horas];
    }
  }

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(private fb: FormBuilder) {
    this.horarioForm = this.fb.group({
      selectedRoles: new FormControl<Estados[] | null>([]),
      fecha: new FormControl<Date | null>(null),
      ingreso: new FormControl<Estados | null>(null),
      salida: new FormControl<Estados | null>(null),
      dias: new FormControl<Estados | null>(null),
      jornada: new FormControl<Estados | null>(null),
    });
  }

  ngOnInit() {
    // Suscribirse a los cambios del campo 'ingreso'
    this.horarioForm.get('ingreso')?.valueChanges.subscribe(() => {
      this.onHoraIngresoChange();
    });
  }
}
