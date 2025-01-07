import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {
  myGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myGroup = this.fb.group({
      cantidad: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      usuario: new FormControl<string | null>(null),
      descripcion: new FormControl<string | null>(null)
    });
  }

  products = [
    {
      id: '1',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      fecha: '2024/01/10',
      price: 65,
      category: 'Accessories',
      quantity: 2,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '2',
      code: 'gfvbghnhjh',
      name: 'Bamboo Watch',
      description: 'Product Description',
      fecha: '2024/01/10',
      price: 65,
      category: 'Accessories',
      quantity: 5,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '3',
      code: 'gfvbghhjh',
      name: 'Bamboo Watch',
      description: 'Product Description',
      fecha: '2024/01/10',
      price: 65,
      category: 'Accessories',
      quantity: 4,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }
  ];

  selectedProducts!: any;

  ngOnInit(): void { }
}
