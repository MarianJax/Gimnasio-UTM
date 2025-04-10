import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamientosService } from '../../service/agendamiento/agendamientos.service';
import { MembresiaService } from '../../service/membresias/membresia.service';
import { AuthService } from '../login/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss'],
})
export class MembresiaComponent implements OnInit {
  form: FormGroup;
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
      this.obtenerAgendamientos(value as Date)
    });
  }

  obtenerAgendamientos(fecha: Date = new Date()) {
    const user = this.authService.getUserData();
    this.serviceAgendamiento.obtenerAgendamientosPorUsuario(user.id, fecha).subscribe((data) => {
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
          this.sharedService.setParametro(data[0].id);
          this.isMembresia = data && data.length > 0 ? true : false;
        },
        error: (error) => {
          console.error('Error al obtener membresías:', error);
        },
      });
  }
}
