import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamientosService } from '../../service/agendamiento/agendamientos.service';
import { MembresiaService } from '../../service/membresias/membresia.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss'],
})
export class MembresiaComponent implements OnInit {
  isMembresia!: boolean;
  date: Date[] | undefined;
  agendamientosPendientes!: any[];
  agendamientosInasistidos!: any[];

  constructor(
    private router: Router,
    private serviceMembresia: MembresiaService,
    private authService: AuthService,
    private serviceAgendamiento: AgendamientosService
  ) {}
  agregarmembresia() {
    this.router.navigate(['/membresia/registro']);
  }

  ngOnInit(): void {
    this.obtenerAgendamientos();
    this.obtenerMembresias();
  }

  obtenerAgendamientos() {
    this.serviceAgendamiento.obtenerAgendamientos().subscribe((data) => {
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
      console.log(this.agendamientosPendientes);
      console.log(this.agendamientosInasistidos);
    });
  }

  obtenerMembresias() {
    const user = this.authService.getUserData();
    this.serviceMembresia
      .obtenerMembresiaPorUsuario(user.id, new Date())
      .subscribe({
        next: (data) => {
          console.log(data && data.length > 0 ? true : false);
          this.isMembresia = data && data.length > 0 ? true : false;
        },
        error: (error) => {
          console.error('Error al obtener membresías:', error);
        },
      });
  }
}
