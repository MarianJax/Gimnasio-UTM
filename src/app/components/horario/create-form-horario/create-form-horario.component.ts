import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HorarioService } from '../../../service/horarios/horario.service';
import { Estados } from '../../agendamientos/create-form/agendamiento-info/agendamiento-info.component';
import { TarifasService } from '../../../service/tarifas/tarifas.service';

const formInit = {
  id: null,
  rol_id: null,
  hora_inicio: null,
  hora_fin: null,
  dia_semana: null,
  jornada: null,
};

@Component({
  selector: 'app-create-form-horario',
  templateUrl: './create-form-horario.component.html',
  styleUrls: ['./create-form-horario.component.scss'],
})
export class CreateFormHorarioComponent implements OnInit {
  horarioForm: FormGroup;
  @Output() addedHorario = new EventEmitter<void>();

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

  roles: { name: string; code: string }[] = [];

  horasSalida: any[] = [...this.horas];

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private tartifaService: TarifasService
  ) {
    this.horarioForm = this.fb.group({
      rol_id: new FormControl<Estados[] | null>([]),
      hora_inicio: new FormControl<Estados | null>(null),
      hora_fin: new FormControl<Estados | null>(null),
      dia_semana: new FormControl<Estados[] | null>([]),
      jornada: new FormControl<Estados | null>(null),
    });
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

    this.tartifaService.obtenerTarifas().subscribe((roles) => {
      roles.map((rol: any) => {
        if (rol.nombre !== 'ENTRENADOR' && rol.nombre !== 'ADMINITRADOR GYM') {
          this.roles.push({ name: rol.rol_id, code: rol.id });
        }
      });
    });
  }

  addHorario() {
    try {
      const horario = this.horarioForm.value;
      this.horarioService
        .agregarHorario({
          rol_id: horario.rol_id && horario.rol_id.code,
          hora_inicio: horario.hora_inicio && horario.hora_inicio.value,
          hora_fin: horario.hora_fin && horario.hora_fin.value,
          dia_semana: horario.dia_semana.map((dia: any) => dia.value),
          jornada: horario.jornada && horario.jornada.value,
        })
        .subscribe({
          next: () => {
            this.addedHorario.emit();
            this.horarioForm.reset(formInit);
          },
          error: (error) => {
            console.error(
              'Error al enviar los datos',
              error,
              error.error.errors
            );
            this.horarioForm.setErrors(error.error.errors);
          },
        });
    } catch (error) {
      console.error('Error al agregar el horario:', error);
      // this.horarioForm.setErrors({ server: 'Error al agregar el horario' });
    }
  }

  resetForm() {
    this.horarioForm.reset(formInit); // Esto resetea el formulario
  }
}
