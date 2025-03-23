import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HorarioService } from '../../../service/horarios/horario.service';
import { RolesService } from '../../../service/roles/roles.service';
import { Estados } from '../../agendamientos/create-form/agendamiento-info/agendamiento-info.component';

const formInit = {
  rol_id: new FormControl<Estados[] | null>([]),
  hora_inicio: new FormControl<Estados | null>(null),
  hora_fin: new FormControl<Estados | null>(null),
  dia_semana: new FormControl<Estados | null>(null),
  jornada: new FormControl<Estados | null>(null),
};

@Component({
  selector: 'app-create-form-horario',
  templateUrl: './create-form-horario.component.html',
  styleUrls: ['./create-form-horario.component.scss'],
})
export class CreateFormHorarioComponent implements OnInit {
  horarioForm: FormGroup;
  @Output() addedHorario = new EventEmitter<void>();

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
    { name: '20:00', value: '20:00' },
  ];

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

  roles: { name: string; code: string }[] = [];

  horasSalida: any[] = [...this.horas];

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private rolesService: RolesService
  ) {
    this.horarioForm = this.fb.group(formInit);
  }

  ngOnInit() {
    // Suscribirse a los cambios del campo 'ingreso'
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

    this.rolesService.obtenerRoles().subscribe((roles) => {
      roles.map((rol: any) => {
        if (rol.nombre !== 'Entrenador' && rol.nombre !== 'Administrador') {
          this.roles.push({ name: rol.nombre, code: rol.id });
        }
      });
    });
  }

  onSubmit() {
    const horario = this.horarioForm.value;
    this.horarioService
      .agregarHorario({
        rol_id: horario.rol_id.code,
        hora_inicio: horario.hora_inicio.value,
        hora_fin: horario.hora_fin.value,
        dia_semana: horario.dia_semana.value,
        jornada: horario.jornada.value,
      })
      .subscribe({
        next: () => {
          this.addedHorario.emit();
          this.horarioForm.reset(formInit);
        },
        error: (error) => {
          console.log('Error al enviar los datos', error);
          this.horarioForm.setErrors(error.error.errors);
        },
      });
  }

  resetForm() {
    this.horarioForm.reset({}); // Esto resetea el formulario
  }
}
