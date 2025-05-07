import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamientosService } from '../../../service/agendamiento/agendamientos.service';
import { HorarioService } from '../../../service/horarios/horario.service';
import { SharedService } from '../../../service/shared.service';
import { AuthService } from '../../login/auth.service';
import { Horario, Intervalo, Reserva } from './type';
import { MessageService } from 'primeng/api';

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
    private horarioService: HorarioService,
    private agendamientosService: AgendamientosService,
    private sharedService: SharedService,
    private authService: AuthService,
    private messageService: MessageService
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

    if (!this.sharedService.getParametro()) {
      this.router.navigate(['/membresia']);
    }

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
    const usuario = this.authService.getUserData();
    if (fecha) {
      this.horarioService
        .obtenerHorariosPorFechaYJornada(fecha, usuario.id, jornada)
        .subscribe((data: Horario[]) => {
          console.log('horarios', data);
          this.agendamientosService.obtenerAgendamientosPorFecha(fecha).subscribe((agendamientos) => {
            this.horarios = this.transformarHorarios(data, agendamientos);
          });
        });
    }
  }

  transformarHorarios(horarios: Horario[], reservas: Reserva[]): Intervalo[] {
    const horariosTransformados: Intervalo[] = [];

    // Normalizamos las reservas a formato HH:mm (quitamos segundos)
    const reservasNormalizadas = reservas.map(reserva => ({
      hora_inicio: reserva.hora_inicio.slice(0, 5), // "09:00:00" -> "09:00"
      hora_fin: reserva.hora_fin.slice(0, 5),       // "11:00:00" -> "11:00"
    }));

    horarios.forEach(horario => {
      const jornada = horario.jornada;
      let [inicioHora, inicioMinuto] = horario.hora_inicio.split(':').map(Number);
      const [finHora, finMinuto] = horario.hora_fin.split(':').map(Number);

      while (inicioHora < finHora || (inicioHora === finHora && inicioMinuto < finMinuto)) {
        const nextHour = inicioMinuto + 60 >= 60 ? inicioHora + 1 : inicioHora;
        const nextMinute = (inicioMinuto + 60) % 60;

        const horaInicioStr = `${String(inicioHora).padStart(2, '0')}:${String(inicioMinuto).padStart(2, '0')}`;
        const horaFinStr = `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`;

        // Verificamos si el intervalo está ocupado
        const ocupado = reservasNormalizadas.some(
          r => r.hora_inicio === horaInicioStr && r.hora_fin === horaFinStr
        );

        horariosTransformados.push({
          jornada,
          hora_inicio: horaInicioStr,
          hora_fin: horaFinStr,
          estado: ocupado ? 'Ocupado' : 'Disponible',
        });

        inicioHora = nextHour;
        inicioMinuto = nextMinute;
      }
    });

    return horariosTransformados;
  }

  agendar({ hora_fin, hora_inicio }: any) {
    let membresia = this.sharedService.getParametro();
    console.log('membresia', membresia, hora_fin, hora_inicio);
  

    if (membresia && this.selectedFecha) {
      console.log('membresia', membresia, hora_fin, hora_inicio);
      this.agendamientosService.agregarAgendamientoMembresia({
        fecha: this.selectedFecha,
        membresia, hora_fin,
        hora_inicio,
        usuario_id: this.authService.getUserData().id,
        distribucion: this.authService.getUserData().rol,
      }).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/membresia']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: err.error.message, life: 3000 });
          console.error(err);
        },
      })
    }
  }

  Regresar() {
    this.router.navigate(['/membresia']);
  }
}
