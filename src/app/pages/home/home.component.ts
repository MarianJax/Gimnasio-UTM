import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  rutinas = [
    {
      nombre: 'Pecho / Triceps',
      intensidad: 'Normal',
      ejercicios: 5,
      slug: 'pecho-triceps'
    },
    {
      nombre: 'Brazos',
      intensidad: 'Alta',
      ejercicios: 3,
      slug: 'brazos'
    },
    {
      nombre: 'Pierna',
      intensidad: 'Normal',
      ejercicios: 4,
      slug: 'pierna'
    },
    {
      nombre: 'Espalda y Bíceps',
      intensidad: 'Normal',
      ejercicios: 5,
      slug: 'espalda-biceps'
    },
    {
      nombre: 'Gluteo',
      intensidad: 'Baja',
      ejercicios: 8,
      slug: 'gluteo'
    },
    {
      nombre: 'Hombros / Abdomen',
      intensidad: 'Alta',
      ejercicios: 7,
      slug: 'hombros-abdomen'
    }
  ];

  goToRutinaDetail(rutinaName: string) {
    const slug = rutinaName.toLowerCase().replace(/ /g, '-');
    this.router.navigate(['/rutina',slug]);
  }
}
