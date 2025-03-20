import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { RolesService } from '../../../service/roles/roles.service';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';

@Component({
  selector: 'app-create-form-usuario',
  templateUrl: './create-form-usuario.component.html',
  styleUrls: ['./create-form-usuario.component.scss']
})
export class CreateFormUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  visible: boolean = false;
  selectedRoles: {
    nombre: string;
    id: string;
  }[] = [];

  @Output() usuarioAgregado = new EventEmitter<void>();

  showDialog() {
    this.rolesService.obtenerRoles().subscribe((roles) => {
      this.roles = roles;
      this.visible = true;
    });
  }

  closedDialog() {
    this.visible = false;
  }

  Niveles = [
    { name: 'Principiante', value: 'Principiante' },
    { name: 'Intermedio', value: 'Intermedio' },
    { name: 'Avanzado', value: 'Avanzado' }
  ]

  items: MenuItem[] | undefined;

  roles: {
    nombre: string;
    id: string;
  }[] = [];

  filteredRoles: any[] = [];

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(private fb: FormBuilder, private rolesService: RolesService, private usuarioService: UsuariosService) {
    this.usuarioForm = this.fb.group({
      roles: new FormControl<string[] | null>(null),
      nombre: new FormControl<string | null>(null),
      apellido: new FormControl<string | null>(null),
      cedula: new FormControl<string | null>(null),
      telefono: new FormControl<string | null>(null),
      correo: new FormControl<string | null>(null),
    });
  }

  ngOnInit() { }

  filterRoles(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.roles as any[]).length; i++) {
      let rol = (this.roles as { id: string; nombre: string }[])[i];

      // Verifica si el rol ya está seleccionado (basado en su 'id' o cualquier otro identificador único)
      const isAlreadySelected = this.selectedRoles.some(role => role.id === rol.id);

      // Si no está seleccionado, lo agrega a la lista de resultados filtrados
      if (!isAlreadySelected && rol.nombre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(rol);
      }
    }

    this.filteredRoles = filtered;
  }

  addUsuario() {
    try {
      const usuarioData = this.usuarioForm.value;
      console.log(usuarioData);
      this.usuarioService.agregarUsuario({
        roles: this.selectedRoles.map(role => role.id),
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        cedula: usuarioData.cedula,
        telefono: usuarioData.telefono,
        correo: usuarioData.correo,
      }).subscribe({
        next: () => {
          this.usuarioForm.reset();
          this.usuarioAgregado.emit(); // Emitir el evento al cerrar
          this.visible = false; // Cerrar el diálogo
        },
        error: (error) => {
          console.log('Error al enviar los datos', error.error.errors);
          this.usuarioForm.setErrors(error.error.errors);
        }
      });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }
}

