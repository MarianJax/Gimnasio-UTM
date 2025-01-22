import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembresiaService } from '../service/membresia.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  constructor(
    private router: Router,
    private serviceMembresia: MembresiaService
  ) {}

  tipos = [
    { name: 'Diario', code: 'diario' },
    { name: 'Mensual', code: 'mensual' },
  ];
  startDate: Date[] | undefined;
  endDate: Date[] | undefined;
  selectedtipo: any//[{name: string, code: string}] = {name: string, code: string};

  ngOnInit(): void {}

  cols = [
    { field: 'hora', header: 'Hora' },
    { field: 'estado', header: 'Estado' },
    { field: 'agendamiento', header: 'Agendamiento' },
  ];

  products = [
    { hora: '7:00', estado: 'Disponible', agendamiento: '' },
    { hora: '8:00', estado: 'Disponible', category: 'Fruits' },
    { hora: '9:00', estado: 'Ocupado', category: 'Fruits' },
    { hora: '10:00', estado: 'Ocupado', category: 'Fruits' },
    { hora: '11:00', estado: 'Disponible', category: 'Vegetables' },
  ];

  Regresar() {
    this.router.navigate(['/membresia']);
  }

  onSubmit(form: NgForm) {
    const formData = {
      startDate: this.startDate?.toLocaleString(),
      endDate: this.endDate?.toLocaleString(),
      selectedtipo: this.selectedtipo?.name ,
      costo: '1',
    };

    console.log(formData);
    this.serviceMembresia.createMembresia(formData).subscribe(
      (response) => {
        console.log('Formulario enviado con éxito', response);
        form.reset();
      },
      (error) => {
        console.error('Error al enviar formulario', error);
      }
    );
  }
}
