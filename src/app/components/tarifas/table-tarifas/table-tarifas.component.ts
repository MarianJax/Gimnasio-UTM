import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TarifasService } from '../../../service/tarifas/tarifas.service';

const FormInit = {
  id: null,
  nombre: null,
  monto_pago: null,
  tiempo: null,
  cupo: null,
};

type InitType = typeof FormInit;

@Component({
  selector: 'app-table-tarifas',
  templateUrl: './table-tarifas.component.html',
  styleUrls: ['./table-tarifas.component.scss'],
})
export class TableTarifasComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  upRolForm: FormGroup;
  tarifas: InitType[] = [];
  Roles: any[] = [
    { code: 'FUNCIONARIO', name: 'Funcionario' },
    { code: 'DOCENTE', name: 'Docente' },
    { code: 'ESTUDIANTE', name: 'Estudiante' },
  ];
  visible: boolean = false;
  @Output() usuarioAgregado = new EventEmitter<void>();

  showDialog(id: string) {
    this.tarifaService.obtenerRol(id).subscribe({
      next: ({ rol_id, ...value }) => {
        console.log(value);
        this.upRolForm.patchValue({rol_id:this.Roles.find((r)=>r.code===rol_id),...value});
        this.visible = true;
      },
    });
  }

  closedDialog() {
    this.upRolForm.reset({
      id: null,
      rol_id: null,
      pago_diario: null,
      pago_semanal: null,
      pago_mensual: null,
      tiempo: null,
      cupo: null,
    });
    this.visible = false;
  }

  constructor(
    private fb: FormBuilder,
    private tarifaService: TarifasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.upRolForm = this.fb.group({
      id: new FormControl<string | null>(null),
      rol_id: new FormControl<string | null>(null),
      pago_diario: new FormControl<number | null>(null),
      pago_semanal: new FormControl<number | null>(0.10),
      pago_mensual: new FormControl<number | null>(null),
      tiempo: new FormControl<number | null>(null),
      cupo: new FormControl<number | null>(null),
    });
  }

  ngOnInit() {
    this.loadRoles();
  } 

  updateRol() {
    try {
      const { pago_diario, pago_mensual,rol_id,...rol } = this.upRolForm.value;
      this.tarifaService.actualizarRol({
        ...rol,
        rol_id: rol_id && rol_id.code,
        pago_diario: Number(pago_diario),
        pago_semanal: Number(rol.pago_semanal),
        pago_mensual: Number(pago_mensual),
      }).subscribe({
        next: () => {
          this.usuarioAgregado.emit();
          this.loadRoles();
          this.visible = false;
          this.upRolForm.reset(FormInit);
        },
        error: (error) => {
          console.log('Error al enviar los datos', error.error.errors);
          this.upRolForm.setErrors(error.error.errors);
        },
      });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }

  deleteHorario(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Distribución',
      message: 'La distribución se eliminará de forma permanente',
      // acceptIcon: "none",
      // rejectIcon: "none",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-success mr-4 p-button-outlined',
      acceptButtonStyleClass: 'p-button-danger p-button-outlined',
      accept: () => {
        this.tarifaService.eliminarHorario(id).subscribe({
          next: () => {
            this.loadRoles(); // Changed from obtenerDatos() to loadRoles()
            this.messageService.add({
              severity: 'success',
              summary: 'Distribución eliminado',
              detail: 'Distribución eliminado con éxito',
            });
          },
        });
      },
      reject: () => {},
    });
  }

  loadRoles() {
    this.tarifaService.obtenerTarifas().subscribe({
      next: (value) => {
        this.tarifas = value;
      },
    });
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = ''; // Limpia el input
    if (this.dt) {
      this.dt.clear(); // Limpia los filtros de la tabla
    }
  }
}
