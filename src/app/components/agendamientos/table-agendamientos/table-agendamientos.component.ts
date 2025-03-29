import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

const ProductsA = {
  id: '1000',
  code: 'f230fh0g3',
  name: 'Bamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
}

type Product = typeof ProductsA;

@Component({
  selector: 'app-table-agendamientos',
  templateUrl: './table-agendamientos.component.html',
  styleUrls: ['./table-agendamientos.component.scss']
})
export class TableAgendamientosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  // Object to store form groups for each product
  productForms: { [key: string]: FormGroup } = {}

  categories: any[] = [
    { name: 'Si', key: 'si' },
    { name: 'No', key: 'no' },
  ];

  productDialog: boolean = false;
  products!: Product[];
  product!: Product;

  statuses!: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.products = [{
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '2000',
      code: 'f2231fh0g3',
      name: 'BaGnd Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }];

    // Create a form group for each product
    this.products.forEach((product: Product) => {
      this.productForms[product.id] = this.fb.group({
        selectedCategory: new FormControl(null),
      });
    });
  }

  onSelectionChange(productId: string, index: string) {
    console.log(`Producto ID: ${productId}, Asistencia: ${index}`);
  }

  // Helper method to get form group for a specific product
  getFormGroup(productId: number): FormGroup {
    return this.productForms[productId]
  }

  onAction(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
  }


  goToList() {
    this.router.navigate(['/admin/agendamientos']);
  }

  goToAssistance() {
    this.router.navigate(['/admin/agendamientos/asistencia']);
  }

  

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }

  clearFilter(inputElement: HTMLInputElement) {
    inputElement.value = '';  // Limpia el input
    if (this.dt) {
      this.dt.clear();  // Limpia los filtros de la tabla
    }
  }

}