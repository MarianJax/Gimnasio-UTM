import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { RolesService } from '../../../service/roles/roles.service';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.scss']
})
export class TableUsuarioComponent implements OnInit {
  usuarioUpdatedForm: FormGroup;
  visible: boolean = false;
  emptyMessage: string = 'Cargando usuarios...';
  usuario: {
    id: string;
    roles: string[];
    nombre: string;
    apellido: string;
    telefono: number;
    cedula: number;
    correo: string;
  } | null = null;

  selectedRoles: {
    nombre: string;
    id: string;
  }[] | null = null;

  roles: {
    nombre: string;
    id: string;
  }[] = [];

  filteredRoles: any[] = [];

  async showDialog(id: string) {
    this.rolesService.obtenerRoles().subscribe((roles) => {
      this.roles = roles;
    });

    this.usuario = await this.usuariosService.obtenerUsuario(id).toPromise();

    this.usuarioUpdatedForm.patchValue({
      id: this.usuario?.id,
      roles: this.usuario?.roles,
      nombre: this.usuario?.nombre,
      apellido: this.usuario?.apellido,
      telefono: this.usuario?.telefono,
      cedula: this.usuario?.cedula,
      correo: this.usuario?.correo
    });

    this.visible = true;
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
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private rolesService: RolesService
  ) {
    this.usuarioUpdatedForm = this.fb.group({
      id: new FormControl<string | null>(null),
      roles: new FormControl<string[] | null>(null),
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
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        if (this.usuarios.length === 0) {
          this.emptyMessage = 'No hay usuarios registrados';
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.emptyMessage = 'No tiene permisos para ver usuarios registrados';
          console.error('Error -> ', err.status);
        } else if (err.status === 500) {
          this.emptyMessage = 'No se pudo obtener los usuarios';
          console.error('Error -> ', err.status);
        }

        console.error('Error -> ', err.status);
      },
    });
  }

  filterRoles(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.roles as any[]).length; i++) {
      let country = (this.roles as { id: string; nombre: string }[])[i];
      // Verifica si el rol ya está seleccionado (basado en su 'id' o cualquier otro identificador único)
      const isAlreadySelected = this.selectedRoles?.some(role => role.id === country.id);

      // Si no está seleccionado, lo agrega a la lista de resultados filtrados
      if (!isAlreadySelected && country.nombre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }

    this.filteredRoles = filtered;
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

  getRolesAsString(maquina: { id: string; roles: { nombre: string; }[]; }) {
    return maquina.roles?.map(role => role.nombre).join(', ') || 'Sin rol asignado';
  }

  updateUsuario() {
    if (this.usuarioUpdatedForm.valid) {
      const usuarioData = this.usuarioUpdatedForm.value;
      console.log({
        id: this.usuario?.id,
        roles: this.selectedRoles?.map(role => role.id),
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        cedula: usuarioData.cedula,
        telefono: usuarioData.telefono,
        correo: usuarioData.correo,
      });
      this.usuariosService.actualizarUsuario({
        id: this.usuario?.id,
        roles: this.selectedRoles?.map(role => role.id),
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        cedula: usuarioData.cedula,
        telefono: usuarioData.telefono,
        correo: usuarioData.correo,
      }).subscribe({
        next: () => {
          this.usuarioUpdatedForm.reset();
          this.obtenerDatos();
          this.visible = false;
        },
        error: (error) => {
          console.log('Error al enviar los datos', error);
          this.usuarioUpdatedForm.setErrors(error.error.errors);
        }
      });
    }
  }

  
}


