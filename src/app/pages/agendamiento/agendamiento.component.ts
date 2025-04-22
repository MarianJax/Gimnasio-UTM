import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarreraService } from '../../service/institucion/carrera.service';
import { FacultadService } from '../../service/institucion/facultad.service';
import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { AuthService } from '../login/auth.service';

interface Options { name: string; code: string; }

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.scss'],
})
export class AgendamientoComponent implements OnInit, AfterViewInit {
  agendamiento: FormGroup;
  visible: boolean = false;
  isEstudiante: boolean = true;

  facultades: Options[] = [];
  carreras: Options[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private facultadService: FacultadService,
    private carreraService: CarreraService,
    private auhtService: AuthService,
    private usuarioService: UsuariosService
  ) {
    const user = this.auhtService.getUserData();
    this.verifyRolInstitucion(user.id, user.roles);

    this.agendamiento = this.fb.group({
      facultad: [null],
      carrera: [null],
    });
  }

  ngOnInit() {
    this.loadFacultades();
    this.loadCarreras();
    // Método para validar el formulario (puede ser llamado desde el componente padre)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.isEstudiante) {
        this.agendamiento.get('carrera')?.setValidators([Validators.required]);
        this.agendamiento.get('carrera')?.updateValueAndValidity();

        this.agendamiento.get('facultad')?.clearValidators();
        this.agendamiento.get('facultad')?.updateValueAndValidity();
      } else {
        this.agendamiento.get('facultad')?.setValidators([Validators.required]);
        this.agendamiento.get('facultad')?.updateValueAndValidity();

        this.agendamiento.get('carrera')?.clearValidators();
        this.agendamiento.get('carrera')?.updateValueAndValidity();
      }
      this.validar();
    }, 500);
  }

  verifyRolInstitucion(id: string, rol: string) {
    this.usuarioService.obtenerUsuario(id).subscribe((data: any) => {
      if (rol === 'Estudiante' && data.carrera === null) {
        this.isEstudiante = true;
        this.visible = true;
      } else if (rol !== 'Estudiante' && data.facultad === null) {
        this.isEstudiante = false;
        this.visible = true;
      } else if ((data.facultad !== null && rol !== 'Estudiante') || (data.carrera !== null && rol === 'Estudiante')) {
        this.visible = false;
      }
    });
  }

  validar() {
    if (this.agendamiento.invalid) {
      const errors: { [key: string]: string } = {};
      Object.keys(this.agendamiento.controls).forEach((key) => {
        const control = this.agendamiento.get(key);
        if (key === 'facultad' && control?.errors && control?.errors['required']) {
          errors[key] = 'La Facultad es requerida';
        } else if (
          key === 'carrera' &&
          control?.errors &&
          control?.errors['required']
        ) {
          errors[key] = 'La Carrera es requerida';
        }
        this.agendamiento.setErrors(errors);
      });
    }
  }

  loadFacultades() {
    this.facultadService.obtenerFacultades().subscribe((data: any) => {
      this.facultades = [];
      data.forEach((facultad: any) => {
        this.facultades.push({ name: facultad.nombre, code: facultad.id });
      });
    });
  }

  loadCarreras() {
    this.carreraService.obtenerCarreras().subscribe((data: any) => {
      this.carreras = [];
      data.forEach((carrera: any) => {
        this.carreras.push({ name: carrera.nombre, code: carrera.id });
      });
    });
  }

  onSubmit() {
    const user = this.auhtService.getUserData();
    if (this.agendamiento.valid) {
      this.usuarioService.actualizarUsuario({
        id: this.auhtService.getUserData().id,
        facultad: this.agendamiento.value.facultad ? this.agendamiento.value.facultad.code : null,
        carrera: this.agendamiento.value.carrera ? this.agendamiento.value.carrera.code : null,
      }).subscribe({
        next: () => {
          this.verifyRolInstitucion(user.id, user.roles);
        },
        error: (error) => {
          console.error('Error al enviar los datos', error);
        },
      })
    }
  }

  goToRutinas() {
    this.router.navigate(['/']);
  }
}
