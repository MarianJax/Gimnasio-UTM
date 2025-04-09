import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RutinasService } from '../../service/rutinas/rutinas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private rutinasService: RutinasService) {}

  rutinas!: {
    id: string;
    nombre: string;
    intensidad: string;
    cantidad_ejercicios: number;
  }[];
  //   = [
  //   {
  //     nombre: 'Pecho / Triceps',
  //     intensidad: 'Normal',
  //     ejercicios: 5,
  //     slug: 'pecho-triceps'
  //   },
  //   {
  //     nombre: 'Brazos',
  //     intensidad: 'Alta',
  //     ejercicios: 3,
  //     slug: 'brazos'
  //   },
  //   {
  //     nombre: 'Pierna',
  //     intensidad: 'Normal',
  //     ejercicios: 4,
  //     slug: 'pierna'
  //   },
  //   {
  //     nombre: 'Espalda y Bíceps',
  //     intensidad: 'Normal',
  //     ejercicios: 5,
  //     slug: 'espalda-biceps'
  //   },
  //   {
  //     nombre: 'Gluteo',
  //     intensidad: 'Baja',
  //     ejercicios: 8,
  //     slug: 'gluteo'
  //   },
  //   {
  //     nombre: 'Hombros / Abdomen',
  //     intensidad: 'Alta',
  //     ejercicios: 7,
  //     slug: 'hombros-abdomen'
  //   }
  // ];

  ngOnInit() {
    this.rutinasService.obtenerRutinas().subscribe(data => {
      this.rutinas = data;
    });
  }

  goToRutinaDetail(id: string) {
    this.router.navigate(['/rutina', id]);
  }
}
