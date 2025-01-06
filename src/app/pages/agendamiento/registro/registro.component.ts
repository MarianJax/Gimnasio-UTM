import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  days = [
    { name: 'Monday', code: 'MON' },
    { name: 'Tuesday', code: 'TUE' },
    { name: 'Wednesday', code: 'WED' },
    { name: 'Thursday', code: 'THU' },
    { name: 'Friday', code: 'FRI' }
  ];
  selectedDays: undefined;

  cols = [
    { field: 'hora', header: 'Hora' },
    { field: 'estado', header: 'Estado' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
];

  products = [
    { hora: 'A', estado: 'Apple', category: 'Fruits', quantity: 2 },
    { hora: 'B', estado: 'Banana', category: 'Fruits', quantity: 1 },
    { hora: 'C', estado: 'Cherry', category: 'Fruits', quantity: 3 },
    { hora: 'D', estado: 'Durian', category: 'Fruits', quantity: 4 },
    { hora: 'E', estado: 'Eggplant', category: 'Vegetables', quantity: 2 },
  ]
}
