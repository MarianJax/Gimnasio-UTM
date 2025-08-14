import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamientosService } from '../../service/agendamiento/agendamientos.service';
import { MembresiaService } from '../../service/membresias/membresia.service';
import { SharedService } from '../../service/shared.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss'],
})
export class MembresiaComponent implements OnInit {
  form: FormGroup;
  mensajeEstadoMembresia!: string;
  isMembresia!: boolean;
  date: Date[] | undefined;
  maxDate: Date = new Date();
  minDate: Date = new Date();
  agendamientosPendientes!: any[];
  agendamientosInasistidos!: any[];

  constructor(
    private router: Router,
    private serviceMembresia: MembresiaService,
    private authService: AuthService,
    private serviceAgendamiento: AgendamientosService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    this.form = this.fb.group({
      fecha: [null],
    });
  }
  agregarmembresia() {
    this.router.navigate(['/membresia/registro']);
  }

  ngOnInit(): void {
    this.obtenerAgendamientos();
    this.obtenerMembresias();

    this.form.get('fecha')?.valueChanges.subscribe((value) => {
      this.obtenerAgendamientos(value as Date);
    });
  }

  obtenerAgendamientos(fecha: Date = new Date()) {
    const user = this.authService.getUserData();
    this.serviceAgendamiento
      .obtenerAgendamientosPorUsuario(user.id, fecha, user.rol)
      .subscribe((data) => {
        this.agendamientosInasistidos = [];
        this.agendamientosPendientes = [];
        data.map(({ asistio, hora_inicio, hora_fin, fecha }: any) => {
          if (asistio === null) {
            this.agendamientosPendientes.push({
              hora_inicio: hora_inicio.slice(0, 5),
              hora_fin: hora_fin.slice(0, 5),
              fecha: fecha as Date,
            });
          }
          if (asistio === false) {
            this.agendamientosInasistidos.push({
              hora_inicio: hora_inicio.slice(0, 5),
              hora_fin: hora_fin.slice(0, 5),
              fecha: fecha as Date,
            });
          }
        });
      });
  }

  obtenerMembresias() {
    const user = this.authService.getUserData();
    this.serviceMembresia
      .obtenerMembresiaPorUsuario(user.id, new Date())
      .subscribe({
        next: (data) => {
          if (data) {
            if (data.pagos.validacion_pago[0].estado === 'Pendiente') {
              this.mensajeEstadoMembresia =
                'Se está validando el pago de su membresia';
            } else if (data.pagos.validacion_pago[0].estado === 'Rechazado') {
              this.mensajeEstadoMembresia =
                'El pago de su membresia ha sido rechazado';
            } else {
              this.maxDate = new Date(data.fecha_fin);
              this.minDate = new Date(data.fecha_inicio);
              console.log('Membresia data:', data);
              const parameters = { valor: data.id as string, min: this.minDate, max: this.maxDate }
              this.sharedService.setParametro(parameters);
              this.isMembresia = data.id ? true : false;
            }
          } else {
            this.mensajeEstadoMembresia = 'No ha adquirido una membresia';
          }
        },
        error: (error) => {
          console.error('Error al obtener membresías:', error);
        },
      });
  }
}
