import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { RolesService } from '../../../service/roles/roles.service';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';

export interface Options {
  name: string,
  code: string
}

@Component({
  selector: 'app-create-form-usuario',
  templateUrl: './create-form-usuario.component.html',
  styleUrls: ['./create-form-usuario.component.scss']
})
export class CreateFormUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  visible: boolean = false;

  @Output() usuarioAgregado = new EventEmitter<void>();

  showDialog() {
    this.rolesService.obtenerRoles().subscribe((roles) => {
      roles.map((rol: { nombre: string, id: string }) => {
        this.roles.push({ name: rol.nombre, code: rol.id });
      });
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

  roles: Options[] = [];
  selectedRoles!: Options[];

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

  addUsuario() {
    try {
      const usuarioData = this.usuarioForm.value;
      console.log(usuarioData);
      this.usuarioService.agregarUsuario({
        roles: this.selectedRoles.map(role => role.code),
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

