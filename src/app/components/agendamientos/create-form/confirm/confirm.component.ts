import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../../service/agendamiento/form-service.service';
import { AgendamientoService } from '../../../../pages/agendamiento/service/agendamiento.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  agendamientoData: any;
  pagoData: any;
  data: any[] = [];

  constructor() {}

  ngOnInit() {}

  obtenerDatosCompletos(data: any[]) {
    console.log(data);
    this.data = data;
  }

}
