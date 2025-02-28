import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.scss']
})
export class TableUsuarioComponent implements OnInit {
  usuarioUpdatedForm: FormGroup;
  visible: boolean = false;
  rutina: any = undefined;

  Niveles = [
    { name: 'Principiante', value: 'Principiante' },
    { name: 'Intermedio', value: 'Intermedio' },
    { name: 'Avanzado', value: 'Avanzado' }
  ]

  showDialog(id: string) {
    this.visible = true;

    this.rutina = this.usuarios.find((rutina: { id: string; }) => rutina.id === id);
    this.usuarioUpdatedForm.patchValue({
      rol_id: this.rutina.rol_id,
      nombre: this.rutina.nombre,
      apellido: this.rutina.apellido,
      telefono: this.rutina.telefono,
      cedula: this.rutina.cedula,
      correo: this.rutina.correo
    });

  }

  closedDialog() {
    this.visible = false;
    this.usuarioUpdatedForm.reset();
  }

  items: MenuItem[] | undefined;

  usuarios: any = [];

  filteredEquipos: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.usuarioUpdatedForm = this.fb.group({
      rol_id: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      apellido: new FormControl<string | null>(null),
      telefono: new FormControl<number | null>(null),
      cedula: new FormControl<number | null>(null),
      correo: new FormControl<string | null>(null),
    });
  }

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  goToMantenimiento() {
    this.router.navigate(['/admin/equipos/mantenimiento']);
  }

  AddMaquina() {
    this.router.navigate(['/admin/equipos/registrar']);
  }

  obtenerDatos() {
    this.usuarios = [
      {
        id: 1,
        nombre: 'Usuario 1',
        apellido: 'Apellido 1',
        telefono: 123456789,
        rol: 'Administrador',
        cedula: 123456789,
        correo: 'usuario1@example.com'
      },
      {
        id: 2,
        nombre: 'Usuario 2',
        apellido: 'Apellido 2',
        telefono: 123456789,
        rol: 'Usuario',
        cedula: 123456789,
        correo: 'usuario2@example.com'
      },
    ];
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.usuarios as any[]).length; i++) {
      let usuario = this.usuarios[i];
      if (usuario.nombre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(usuario);
      }
    }

    this.filteredEquipos = filtered;
  }
}


