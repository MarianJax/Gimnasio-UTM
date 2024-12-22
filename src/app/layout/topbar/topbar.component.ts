import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit {
  items!: MenuItem[];
  nombre_usuario: string = 'John Doe';
  cedula: string = '1234567890';

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  theme: string = 'lara-light-indigo';
  colorScheme: string = 'light';

  constructor(public layoutService: LayoutService, private router: Router) {}

  ngOnInit() {
    this.theme = localStorage.getItem('theme_utm_gimnasio') || 'lara-light-indigo';
    this.colorScheme = localStorage.getItem('color_scheme_utm_gimnasio') || 'light';
    this.changeTheme(this.theme, this.colorScheme);
  }

  cambiar_modo_oscuro() {
    if (this.colorScheme === 'light') {
      this.theme = 'lara-dark-indigo';
      this.colorScheme = 'dark';
    } else {
      this.theme = 'lara-light-indigo';
      this.colorScheme = 'light';
    }
    localStorage.setItem('theme_utm_gimnasio', this.theme);
    localStorage.setItem('color_scheme_utm_gimnasio', this.colorScheme);
    this.changeTheme(this.theme, this.colorScheme);
  }

  logout() {
    // Clear any stored user data or tokens
    localStorage.removeItem('user_token');
    sessionStorage.clear();

    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  changeTheme(theme: string, colorScheme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    if (themeLink) {
      const newHref = themeLink
        .getAttribute('href')!
        .replace(this.layoutService.config.theme, theme);
      this.replaceThemeLink(newHref, () => {
        this.layoutService.config.theme = theme;
        this.layoutService.config.colorScheme = colorScheme;
        this.layoutService.onConfigUpdate();
      });
    } else {
      console.error('Theme link element not found');
    }
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    if (themeLink) {
      const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');

      themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

      cloneLinkElement.addEventListener('load', () => {
        themeLink.remove();
        cloneLinkElement.setAttribute('id', id);
        onComplete();
      });
    } else {
      console.error('Theme link element not found');
    }
  }
}