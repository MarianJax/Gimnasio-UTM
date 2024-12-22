import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cargar: boolean = false;
  availability: number = 85;
  workouts: Array<{ name: string, duration: string }> = [
    { name: 'Pecho / Tríceps', duration: '1 Hora' },
    { name: 'Pierna', duration: '1 Hora' },
    { name: 'Glúteo', duration: '2 Hora' },
    { name: 'Brazos', duration: '1 Hora' },
    { name: 'Espalda y Bíceps', duration: '4 Hora' },
    { name: 'Hombros / Abdomen', duration: '1 Hora' }
  ];
  Constructor() { }

  ngOnInit(): void {
  }

  scheduleWorkout(workout: { name: string, duration: string }): void {
    alert(`Agendado: ${'Agendado: Pecho/Triceps'} por ${'1hora'}`);
  }

  
  }AbortController
