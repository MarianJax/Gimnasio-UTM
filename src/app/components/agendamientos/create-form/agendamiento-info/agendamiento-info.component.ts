import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface Estados {
  name: string;
  code: string;
}

@Component({
  selector: 'app-agendamiento-info',
  templateUrl: './agendamiento-info.component.html',
  styleUrls: ['./agendamiento-info.component.scss']
})
export class AgendamientoInfoComponent implements OnInit {
  agendarForm: FormGroup;

  ingresoOpt = [
    { name: '08:00', value: '08:00' },
    { name: '09:00', value: '09:00' }
  ];

  salidaOpt = [
    { name: '09:00', value: '09:00' }
  ];

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(private fb: FormBuilder) {
    this.agendarForm = this.fb.group({
      fecha: new FormControl<Date | null>(null),
      ingreso: new FormControl<Estados | null>(null),
      salida: new FormControl<Estados | null>(null),
    });
  }

  ngOnInit() { }
}
