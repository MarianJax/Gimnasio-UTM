import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EquiposerviceService } from './service/equiposervice.service';

interface Estados {
  name: string;
  code: string;
}

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {
  myGroup: FormGroup;
  estadosOpt= [
    { name: 'Disponible', code: 'disponible' },
    { name: 'Mantenimiento', code: 'mantenimiento' },
    { name: 'Fuera de Servicio', code: 'fueraservicio' }
  ];

  selectedestado: any

  constructor(
    private equipoService: EquiposerviceService,
    private fb: FormBuilder,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.myGroup = this.fb.group({
      cantidad: new FormControl<number | null>(1),
      estado: new FormControl<Estados | null>(null),
      name: new FormControl<string | null>(null),
      date_compra: new FormControl<Date | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }
  addMaquina() {
    const newMaquina = this.myGroup.value;
    this.equipoService.enviarDatos(newMaquina).subscribe((response) => {
      console.log('Datos enviados exitosamente', response);
      this.myGroup = this.fb.group({
        cantidad: new FormControl<number | null>(1),
        estado: new FormControl<Estados | null>(null),
        name: new FormControl<string | null>(null),
        date_compra: new FormControl<Date | null>(null),
        descripcion: new FormControl<string | null>(null),
      });
      this.obtenerDatos();
      this.cdRef.detectChanges(); // Forzar la detección de cambios
    });
  }

  maquinas = [];

  selectedProducts!: any;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  goToMantenimiento() {
    this.router.navigate(['/admin/equipos/mantenimiento']);
  }

  obtenerDatos() {
    this.equipoService
      .obtenerDatos()
      .subscribe((data) => (this.maquinas = data));
  }
}
