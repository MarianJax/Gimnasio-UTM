import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarioForm!: FormGroup;
  theme: any;
  colorScheme: any;

  constructor(private fb: FormBuilder, private router: Router, public layoutService: LayoutService, private authService: AuthService) {
    this.theme = localStorage.getItem('theme_utm_gimnasio');
    this.colorScheme = localStorage.getItem('color_scheme_utm_gimnasio');
    if (this.theme) {
      this.changeTheme(this.theme, this.colorScheme);
    } else {
      this.theme = "saga-green";
      this.colorScheme = "light";
    }
  }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      correo: [''],
      contrasena: ['']
    });
  }

  changeTheme(theme: string, colorScheme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
    this.layoutService.config.colorScheme
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  AutenticarDatos() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;
      //console.log('Desde el obSubmit ->',usuario);
      this.authService.autenticar(usuario)
        .subscribe({
          next: (response) => {
            if (response.state === 'success') {
              sessionStorage.setItem('session-usuario', JSON.stringify(response.user));
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            if (err.error.state === 'error') {
              if (err.error.response.match(/El usuario \[<b>(.*?)<\/b>\],No existe!/)) {
                const match = err.error.response.match(/El usuario \[<b>(.*?)<\/b>\],No existe!/);
                console.log(`El usuario ${match[1]}, No existe!`);

                this.usuarioForm.setErrors({
                  correo: `El usuario ${match[1]}, No existe!`,
                });
              } else {
                this.usuarioForm.setErrors({ contrasena: 'La contraseña es incorrecta' });
              }

              console.log('Error al enviar los datos', err.error.response);
              return;
            }
            this.usuarioForm.setErrors(err.error.errors);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
