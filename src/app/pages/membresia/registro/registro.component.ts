import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  days = [
    { name: 'Lunes', code: 'MON' },
    { name: 'Martes', code: 'TUE' },
    { name: 'Miercoles', code: 'WED' },
    { name: 'Jueves', code: 'THU' },
    { name: 'Viernes', code: 'FRI' }
  ];
  selectedDays: undefined;

  cols = [
    { field: 'hora', header: 'Hora' },
    { field: 'estado', header: 'Estado' },
    { field: 'agendamiento', header: 'Agendamiento' },
   
];

  products = [
    { hora: '7:00', estado: 'Disponible', agendamiento: '', },
    { hora: '8:00', estado: 'Disponible', category: 'Fruits',  },
    { hora: '9:00', estado: 'Ocupado', category: 'Fruits',  },
    { hora: '10:00', estado: 'Ocupado', category: 'Fruits',},
    { hora: '11:00', estado: 'Disponible', category: 'Vegetables', },
  ]
   constructor(private router: Router) {}
  ; 
  Regresar(){
    this.router.navigate(['/agendamiento/']);
   }
}
