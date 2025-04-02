import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RolesService } from '../../../service/roles/roles.service';

const FormInit = {
  id: null,
  nombre: null,
  monto_pago: null,
  tiempo: null,
  cupo: null,
}

type InitType = typeof FormInit;

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.scss']
})
export class TableRolesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  upRolForm: FormGroup;
  roles: InitType[] = [];
  visible: boolean = false;
  @Output() usuarioAgregado = new EventEmitter<void>();

  showDialog(id: string) {
    this.rolesService.obtenerRol(id)
      .subscribe({
        next: (value) => {
          this.upRolForm.patchValue(value);
          this.visible = true;
        },
      })
  }

  closedDialog() {
    this.upRolForm.reset(FormInit);
    this.visible = false;
  }

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.upRolForm = this.fb.group({
      id: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      monto_pago: new FormControl<number | null>(null),
      tiempo: new FormControl<number | null>(null),
      cupo: new FormControl<number | null>(null),
    });
  }

  ngOnInit() { this.loadRoles(); }

  updateRol() {
    try {
      const rol = this.upRolForm.value;
      console.log(rol);
      this.rolesService.actualizarRol(rol)
        .subscribe({
          next: () => {
            this.usuarioAgregado.emit();
            this.loadRoles();
            this.visible = false;
            this.upRolForm.reset(FormInit);
          },
          error: (error) => {
            console.log('Error al enviar los datos', error.error.errors);
            this.upRolForm.setErrors(error.error.errors);
          }
        })

    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }

  deleteHorario(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Ejercicio',
      message: 'El ejercicio se eliminará de forma permanente',
      // acceptIcon: "none",
      // rejectIcon: "none",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: "p-button-success mr-4 p-button-outlined",
      acceptButtonStyleClass: "p-button-danger p-button-outlined",
      accept: () => {
        this.rolesService.eliminarHorario(id).subscribe({
          next: () => {
            this.loadRoles(); // Changed from obtenerDatos() to loadRoles()
            this.messageService.add({ severity: 'success', summary: 'Ejercicio eliminado', detail: 'Ejercicio eliminado con éxito' });
          }
        });
      },
      reject: () => { }
    });
  }

  loadRoles() {
    this.rolesService.obtenerRoles()
      .subscribe({
        next: (value) => {
          this.roles = value;
        },
      })
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