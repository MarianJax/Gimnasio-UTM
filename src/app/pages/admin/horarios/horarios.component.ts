import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CreateFormHorarioComponent } from '../../../components/horario/create-form-horario/create-form-horario.component';
import { TableHorariosComponent } from '../../../components/horario/table-horarios/table-horarios.component';
import { CreateHorarioEntrenadorComponent } from '../../../components/horario_entrenador/create-horario-entrenador/create-horario-entrenador.component';
import { TableHorarioEntrenadorComponent } from '../../../components/horario_entrenador/table-horario-entrenador/table-horario-entrenador.component';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
})
export class HorariosComponent implements OnInit {
  userRol: string = '';
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRol = this.authService.getUserData().rol;
    this.items = [
      { icon: 'dashboard', route: '/admin', label: 'Inicio' },
      { label: 'Horarios' },
    ];
  }

  @ViewChild(TableHorariosComponent) tableHorario!: TableHorariosComponent;
  @ViewChild(TableHorarioEntrenadorComponent)
  tableHorarioEntr!: TableHorarioEntrenadorComponent;
  @ViewChild(CreateFormHorarioComponent)
  formUsuarios!: CreateFormHorarioComponent;
  @ViewChild(CreateHorarioEntrenadorComponent)
  formEntrenadores!: CreateHorarioEntrenadorComponent;

  obtenerHorario() {
    if (this.tableHorario) {
      this.tableHorario.obtenerDatos(); // Llama al método de actualización de la tabla
    }
  }

  obtenerHorarioEntrenador() {
    if (this.tableHorarioEntr) {
      this.tableHorarioEntr.obtenerDatos();
    }
  }

  resetearFormularios(event: any) {
    if (event.index === 0) {
      this.formUsuarios.horarioForm.reset({}); // Llamar a la función de reseteo del formulario
    } else if (event.index === 1) {
      this.formEntrenadores.horarioForm.reset({}); // Llamar a la función de reseteo del formulario
    }
  }
}
