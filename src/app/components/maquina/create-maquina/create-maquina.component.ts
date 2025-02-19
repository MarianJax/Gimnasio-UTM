import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Estados } from 'src/app/pages/admin/equipos/equipos.component';
import { EquiposerviceService } from 'src/app/pages/admin/equipos/service/equiposervice.service';

@Component({
  selector: 'app-create-maquina',
  templateUrl: './create-maquina.component.html',
  styleUrls: ['./create-maquina.component.scss'],
})
export class CreateMaquinaComponent implements OnInit {
  maquinaForm: FormGroup;
  estadosOpt = [
    { name: 'Disponible', code: 'Disponible' },
    { name: 'Mantenimiento', code: 'Mantenimiento' },
    { name: 'Fuera de Servicio', code: 'Fuera de servicio' },
  ];

  selectedestado: any;

  constructor(
    private equipoService: EquiposerviceService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.maquinaForm = this.fb.group({
      cantidad: new FormControl<number | null>(1),
      estado: new FormControl<Estados | null>(null),
      nombre: new FormControl<string | null>(null),
      fecha_compra: new FormControl<Date | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }

  addMaquina() {
    try {
      const newMaquina = this.maquinaForm.value;
      this.equipoService.enviarDatos({
        cantidad: newMaquina.cantidad,
        estado: newMaquina.estado && newMaquina.estado.code,
        nombre: newMaquina.nombre,
        fecha_compra: newMaquina.fecha_compra && new Date(newMaquina.fecha_compra).toISOString(),
        descripcion: newMaquina.descripcion,
      }).subscribe({
        next: (response) => {
          this.maquinaForm.reset({
            cantidad: 1,
            estado: null,
            nombre: null,
            fecha_compra: null,
            descripcion: null,
          });
          this.router.navigate(['admin/equipos']);
        },
        error: (error) => {
          console.log('Error al enviar los datos', error.error.errors);
          this.maquinaForm.setErrors(error.error.errors);
        }
      });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }

  ngOnInit(): void {}
}
