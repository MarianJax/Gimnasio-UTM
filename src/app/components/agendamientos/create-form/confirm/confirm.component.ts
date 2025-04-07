import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../../service/agendamiento/form-service.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  agendamientoData: any
  pagoData: any
  data: any[] = []

  constructor(private formDataService: FormService) { }

  ngOnInit() {
    // Obtener datos de agendamiento
    this.formDataService.agendamientoData$.subscribe((data) => {
      this.agendamientoData = data
    })

    // Obtener datos de pago
    this.formDataService.pagoData$.subscribe((data) => {
      this.pagoData = data
    })
  }

  obtenerDatosCompletos() {
    this.data = this.formDataService.getAllFormData();
    return this.formDataService.getAllFormData();
  }

}
