import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuarioForm!: FormGroup;
  theme: any;
  colorScheme: any;
  cargar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      correo: [''],
      contrasena: [''],
    });
  }

  AutenticarDatos() {
    this.cargar = true;
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;
      this.authService.autenticar(usuario).subscribe({
        next: (response) => {
          if (response.state === 'success') {
            sessionStorage.setItem(
              'session-usuario',
              JSON.stringify(response.user)
            );
            this.cargar = false;
            if (response.user.roles === 'Administrador') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        error: (err) => {
          this.cargar = false;
          if (err.error.state === 'error') {
            if (
              err.error.response.match(
                /El usuario \[<b>(.*?)<\/b>\],No existe!/
              )
            ) {
              const match = err.error.response.match(
                /El usuario \[<b>(.*?)<\/b>\],No existe!/
              );

              this.usuarioForm.setErrors({
                correo: `El usuario ${match[1]}, No existe!`,
              });
            } else {
              this.usuarioForm.setErrors({
                contrasena: 'La contraseña es incorrecta',
              });
            }

            return;
          }
          this.usuarioForm.setErrors(err.error.errors);
          console.error('Error al enviar los datos', err);
        },
      });
    } else {
    }
  }
}
