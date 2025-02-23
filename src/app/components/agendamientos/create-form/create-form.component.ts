import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  items: MenuItem[] = [];
  activeIndex: number = 0;

  ngOnInit() {
    this.items = [
      { label: 'agendamiento' },
      { label: 'Pago' },
      { label: 'Confirmación' }
    ];
  }

  next() {
    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    }
  }

  prev() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  finalizar() {
    // Lógica para finalizar el proceso
    alert('Proceso finalizado con éxito');
  }
}
