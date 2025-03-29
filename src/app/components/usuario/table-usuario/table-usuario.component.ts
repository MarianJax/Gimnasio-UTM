import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RolesService } from '../../../service/roles/roles.service';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.scss']
})
export class TableUsuarioComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  usuarioUpdatedForm: FormGroup;
  visible: boolean = false;
  emptyMessage: string = 'Cargando usuarios...';
  usuario: {
    id: string;
    roles: { id: string, nombre: string }[];
    nombre: string;
    apellido: string;
    telefono: number;
    cedula: number;
    correo: string;
  } | null = null;

  selectedRoles: {
    name: string;
    code: string;
  }[] | null = null;

  roles: {
    name: string;
    code: string;
  }[] = [];

  filteredRoles: any[] = [];

  showDialog(id: string) {
    this.usuariosService.obtenerUsuario(id).subscribe({
      next: (usuario) => {
        this.usuarioUpdatedForm.patchValue({
          id: usuario?.id,
          roles: this.roles.filter((obj) =>
            usuario?.roles.some((role: { id: string }) => role.id === obj.code)
          ),
          nombre: usuario?.nombre,
          apellido: usuario?.apellido,
          telefono: usuario?.telefono,
          cedula: usuario?.cedula,
          correo: usuario?.correo
        });

        this.visible = true;
      },
    });

  }

  closedDialog() {
    this.visible = false;
    this.usuarioUpdatedForm.reset({
      id: null,
      roles: null,
      nombre: null,
      apellido: null,
      telefono: null,
      cedula: null,
      correo: null,
    });
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

    this.rolesService.obtenerRoles().subscribe((roles) => {
      roles.map((rol: { nombre: string, id: string }) =>
        this.roles.push({ name: rol.nombre, code: rol.id }))
    });
    this.obtenerDatos();
  }

  goToRoles() {
    this.router.navigate(['/admin/usuarios/roles']);
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

  getRolesAsString(maquina: { id: string; roles: { nombre: string; }[]; }) {
    return maquina.roles?.map(role => role.nombre).join(', ') || 'Sin rol asignado';
  }

  updateUsuario() {
    if (this.usuarioUpdatedForm.valid) {
      const usuarioData = this.usuarioUpdatedForm.value;
      this.usuariosService.actualizarUsuario({
        id: usuarioData.id,
        roles: this.selectedRoles?.map(role => role.code),
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        cedula: usuarioData.cedula,
        telefono: usuarioData.telefono,
        correo: usuarioData.correo,
      }).subscribe({
        next: () => {
          this.usuarioUpdatedForm.reset({
            id: null,
            roles: null,
            nombre: null,
            apellido: null,
            telefono: null,
            cedula: null,
            correo: null,
          });
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
  
  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = '';  // Limpia el input
    if (this.dt) {
      this.dt.clear();  // Limpia los filtros de la tabla
    }
  }

}


