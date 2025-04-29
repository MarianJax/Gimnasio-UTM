import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { bufferToImage } from '../../../../core/utiils/convertImage';
import { AgendamientosService } from '../../../../service/agendamiento/agendamientos.service';
import { ValidacionesPagosService } from '../../../../service/validacion-pago/validaciones-pagos.service';
import { AgendamientoType, EstadoPago } from '../type';

@Component({
  selector: 'app-table-validaciones',
  templateUrl: './table-validaciones.component.html',
  styleUrls: ['./table-validaciones.component.scss']
})
export class TableValidacionesComponent implements OnInit {
  @Input() verReporte!: boolean;
  visible: boolean = false;
  form!: FormGroup;
  @ViewChild('dt') dt!: Table;

  categories: any[] = [
    { name: 'Si', key: 'si' },
    { name: 'No', key: 'no' },
  ];

  productDialog: boolean = false;
  agendamientos!: AgendamientoType[];
  agendamiento!: AgendamientoType;

  statuses!: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private fb: FormBuilder, private router: Router, private agendamientoService: AgendamientosService, private validatePagoService: ValidacionesPagosService) {
    this.form = this.fb.group({
      img: new FormControl(null),
    });
  }

  ngOnInit() {
    this.loadAgendamientos();
  }

  loadAgendamientos() {

    this.agendamientoService.obtenerAgendamientosWithPendingValidation(!this.verReporte ? 5 : undefined, !this.verReporte).subscribe((data: AgendamientoType[]) => {
      this.agendamientos = data.map(item => ({
        ...item,
        rol: item.distribucion.rol_id,  // Solo el nombre del primer rol

      }));
      console.log(data);
    });
  }

  onSelectionChange(id: string, estado: string) {
    this.validatePagoService.actualizarValidacion(id, { estado: estado as EstadoPago }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Pago Validado con éxito', life: 3000 });
        this.loadAgendamientos();
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo validar el Pago', life: 3000 });
      }
    });
    console.log(`Producto ID: ${id}, Asistencia: ${estado} `);
  }

  goToReport() {
    this.router.navigate(['/admin/agendamientos/reportes']);
  }

  // onAction(agendamiento: AgendamientoType) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + agendamiento.fecha + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.agendamientos = this.agendamientos.filter((val) => val.id !== agendamiento.id);
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  //     }
  //   });
  // }

  goToList() {
    this.router.navigate(['/admin/agendamientos']);
  }

  goToAssistance() {
    this.router.navigate(['/admin/agendamientos/asistencia']);
  }

  openImage(id: string) {
    this.validatePagoService.obtenerValidacion(id).subscribe((data: any) => {
      console.log(data);
      this.form.patchValue({
        img: bufferToImage(data.evidencia.data, data.tipo),
      });
      this.visible = true;
    });
  }

  getSeverity(status: string) {
    switch (status as EstadoPago) {
      case EstadoPago.APROBADO:
        return 'success';

      case EstadoPago.RECHAZADO:
        return 'danger';

      case EstadoPago.PENDIENTE:
        return 'warning';
      default:
        return 'secondary';
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
