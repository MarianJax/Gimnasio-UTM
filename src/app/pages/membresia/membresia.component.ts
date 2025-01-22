import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembresiaService } from './service/membresia.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss'],
})
export class MembresiaComponent implements OnInit {
  datos: any;
  date: Date[] | undefined;

  constructor(
    private router: Router,
    private serviceMembresia: MembresiaService
  ) {}
  agregarmembresia() {
    this.router.navigate(['/membresia/registro']);
  }

  ngOnInit(): void {
    this.obtenerMembresias();
    console.log('Datos despues del llamado', this.datos);
  }

  obtenerMembresias() {
    this.serviceMembresia.obtenerDatos().subscribe(
      (data) => {
        console.log(data);
        this.datos = data;
      },
      (error) => {
        console.error('Error al obtener membresías:', error);
      }
    );
  }

}
