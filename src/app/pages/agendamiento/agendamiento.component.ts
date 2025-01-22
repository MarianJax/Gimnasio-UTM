import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationErrors } from '@angular/forms';
import { Validator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AgendamientoService } from './service/agendamiento.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.scss'],
})
export class AgendamientoComponent {
  date: Date[] | undefined;
  agendamiento: any;
  Agendamiento: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private agendamientoService: AgendamientoService
  ) {
    this.agendamiento = this.fb.group({
      date: ['', Validators.required],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      expiry: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)],
      ],
      cardHolder: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      callePrincipal: ['', [Validators.required]],
      calleSecundaria: [''],
      codigoPostal: ['', [Validators.required]],
      planType: ['daily', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.Agendamiento.valid) {
      // Lógica para manejar el envío del formulario
      console.log('Formulario enviado', this.Agendamiento.value);
      this.router.navigate(['/ruta-destino']); // Cambia '/ruta-destino' por la ruta deseada
    }
  }

  private handleError(error: HttpErrorResponse) { return throwError(() => new Error('Ocurrió un error; intente nuevamente más tarde.')); }

  createReserva(data: any) {
    this.agendamientoService
      .createAgendamiento({})
      .pipe(catchError(this.handleError))
      .subscribe(
        (response) => {
          console.log('Reserva creada con éxito:', response);
        },
        (error) => {
          console.error('Error al crear la reserva:', error);
          if (error.status === 400) {
            alert('Número máximo de reservas alcanzado.');
          }
        }
      );
  }

  goToRutinas() {
    this.router.navigate(['/']);
  }
}
