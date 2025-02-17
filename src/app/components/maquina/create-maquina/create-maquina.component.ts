import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Estados } from 'src/app/pages/admin/equipos/equipos.component';
import { EquiposerviceService } from 'src/app/pages/admin/equipos/service/equiposervice.service';

@Component({
  selector: 'app-create-maquina',
  templateUrl: './create-maquina.component.html',
  styleUrls: ['./create-maquina.component.scss']
})
export class CreateMaquinaComponent implements OnInit {
  myGroup: FormGroup;
  estadosOpt = [
    { name: 'Disponible', code: 'Disponible' },
    { name: 'Mantenimiento', code: 'Mantenimiento' },
    { name: 'Fuera de Servicio', code: 'Fuera de servicio' }
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
      this.cdRef.detectChanges(); // Forzar la detección de cambios
    });
  }


  ngOnInit(): void { }

}
