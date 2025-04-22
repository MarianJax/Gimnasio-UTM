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
      .obtenerAgendamientosPorUsuario(user.id, fecha)
      .subscribe((data) => {
        this.agendamientosInasistidos = [];
        this.agendamientosPendientes = [];
        data.map((agendamiento: any) => {
          if (agendamiento.asistio === null) {
            this.agendamientosPendientes.push(agendamiento);
          }
          if (agendamiento.asistio === false) {
            this.agendamientosInasistidos.push(agendamiento);
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
              this.sharedService.setParametro(data.id);
              this.isMembresia = data.id ? true : false;
            }
          } else {
            this.mensajeEstadoMembresia = 'No ha adquierido una membresia';
          }
        },
        error: (error) => {
          console.error('Error al obtener membresías:', error);
        },
      });
  }
}
