import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Estados } from '../agendamiento-info/agendamiento-info.component';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.scss']
})
export class PagoFormComponent implements OnInit {
  pagoForm: FormGroup;
  tieneMembresiaActiva: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;

  metodoOpt = [
    { name: 'Diario', value: 'diario' },
    { name: 'Mensual', value: 'mensual' }
  ];

  cuentaAhorros: string = '';
  metodoPago: string = 'Diario';
  fechaPago: string = '';
  monto: number = 0.5;
  evidenciaPago: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  constructor(private fb: FormBuilder) {
    this.pagoForm = this.fb.group({
      fecha_pago: new FormControl<Date | null>(null),
      monto: new FormControl<number | null>(null),
      metodo_pago: new FormControl<Estados | null>(null),
    });
  }

  ngOnInit() { }
}
