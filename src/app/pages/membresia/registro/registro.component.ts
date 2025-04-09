import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HorarioService } from '../../../service/horarios/horario.service';
import { Horario, Intervalo } from './type';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  membresiaForm: FormGroup;
  horarios!: Intervalo[];
  selectedFecha: Date | null = null;
  selectedJornada: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private horarioService: HorarioService
  ) {
    this.membresiaForm = this.fb.group({
      fecha: new FormControl(''),
      jornada: new FormControl(''),
    });
  }

  tipos = [
    { name: 'Matutina', code: 'Matutina' },
    { name: 'Vespertina', code: 'Vespertina' },
  ];

  ngOnInit(): void {
    this.membresiaForm.get('fecha')?.valueChanges.subscribe((value: Date) => {
      this.selectedFecha = value;
      this.consultarHorarios(value, this.selectedJornada as string);
    });
    this.membresiaForm.get('jornada')?.valueChanges.subscribe((value) => {
      this.selectedJornada = value.code;
      this.consultarHorarios(this.selectedFecha as Date, value.code);
    });
  }

  consultarHorarios(fecha: Date, jornada?: string) {
    if (fecha) {
      this.horarioService
        .obtenerHorariosPorFechaYJornada(fecha, jornada)
        .subscribe((data: Horario[]) => {
          console.log(data);
          this.horarios = this.transformarHorarios(data);
          console.log(this.horarios);
        });
    }
  }

  transformarHorarios(horarios: Horario[]): Intervalo[] {
    // Variable para almacenar los horarios transformados
    const horariosTransformados: Intervalo[] = [];
  
    // Iterar sobre cada horario
    horarios.forEach(horario => {
      const jornada = horario.jornada;
      let horaInicio = horario.hora_inicio;
      let horaFin = horario.hora_fin;
  
      // Convertimos las horas a números para facilitar la comparación y división
      const [inicioHora, inicioMinuto] = horaInicio.split(':').map(num => parseInt(num));
      const [finHora, finMinuto] = horaFin.split(':').map(num => parseInt(num));
  
      let currentHour = inicioHora;
      let currentMinute = inicioMinuto;
  
      // Mientras la hora de inicio sea menor a la hora de fin
      while (currentHour < finHora || (currentHour === finHora && currentMinute < finMinuto)) {
        // Formateamos las horas en formato HH:mm
        const nextHour = (currentMinute + 60 >= 60) ? currentHour + 1 : currentHour;
        const nextMinute = (currentMinute + 60) % 60;
  
        // Crear el nuevo intervalo
        horariosTransformados.push({
          jornada,
          hora_inicio: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
          hora_fin: `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`,
          estado: 'disponible', // El estado inicial siempre es disponible
        });
  
        // Actualizar la hora y minuto para el siguiente ciclo
        currentHour = nextHour;
        currentMinute = nextMinute;
      }
    });
  
    return horariosTransformados;
  }

  Regresar() {
    this.router.navigate(['/membresia']);
  }
}
