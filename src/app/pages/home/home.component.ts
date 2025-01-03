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
      name: 'Pecho / Triceps',
      time: '1 hour',
      slug: 'pecho-triceps'
    },
    {
      name: 'Brazos',
      time: '1 hour',
      slug: 'brazos'
    },
    {
      name: 'Pierna',
      time: '1 hour',
      slug: 'pierna'
    },
    {
      name: 'Espalda y Bíceps',
      time: '1 hour',
      slug: 'espalda-biceps'
    },
    {
      name: 'Gluteo',
      time: '1 hour',
      slug: 'gluteo'
    },
    {
      name: 'Hombros / Abdomen',
      time: '1 hour',
      slug: 'hombros-abdomen'
    }
  ];

  goToRutinaDetail(rutinaName: string) {
    const slug = rutinaName.toLowerCase().replace(/ /g, '-');
    this.router.navigate(['/rutina',slug]);
  }
}
