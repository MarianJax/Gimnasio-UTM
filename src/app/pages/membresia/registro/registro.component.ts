import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
];

  products = [
    { code: 'A', name: 'Apple', category: 'Fruits', quantity: 2 },
    { code: 'B', name: 'Banana', category: 'Fruits', quantity: 1 },
    { code: 'C', name: 'Cherry', category: 'Fruits', quantity: 3 },
    { code: 'D', name: 'Durian', category: 'Fruits', quantity: 4 },
    { code: 'E', name: 'Eggplant', category: 'Vegetables', quantity: 2 },
  ]
   constructor(private router: Router) {}
  ; 
  Regresar(){
    this.router.navigate(['/agendamiento/']);
   }
}
