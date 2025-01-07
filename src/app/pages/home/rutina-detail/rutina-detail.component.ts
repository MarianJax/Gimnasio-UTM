import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-rutina-detail',
  templateUrl: './rutina-detail.component.html',
  styleUrls: ['./rutina-detail.component.scss'],
})
export class RutinaDetailComponent implements OnInit {
  rutinaSlug: string = '';

  rutinaItems = [
    {
      slug: 'pecho-triceps',
      machines: [
        {
          id: 1,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 10,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 2,
          nombre: 'Cardio',
          descripcion: 'Ejercicios cardiovasculares',
          estado: 'Disponible',
          duracion: 20,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 3,
          nombre: 'Fuerza',
          descripcion: 'Ejercicios de fuerza',
          estado: 'Disponible',
          duracion: 25,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 4,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 30,
          maquina: 'Maquina',
          peso:'10kg',
        },
      ],
    },
    {
      slug: 'brazos',
      machines: [
        {
          id: 1,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 10,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 2,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 20,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 3,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 30,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 4,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 40,
          maquina: 'Maquina',
          peso:'10kg',

        },
      ],
    },
    {
      slug: 'pierna',
      machines: [
        {
          id: 1,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 10,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 2,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 20,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 3,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 30,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 4,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 40,
          maquina: 'Maquina',
          peso:'10kg',
        },
      ]

    },
    {
      slug: 'gluteo',
      machines: [
        {
          id: 1,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 10,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 2,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 20,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 3,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 30,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 4,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 40,
          maquina: 'Maquina',
          peso:'10kg',

        },
      ],
    },

    {
      slug: 'espalda-biceps',
      machines: [
        {
          id: 1,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 10,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 2,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 20,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 3,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 30,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 4,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 40,
          maquina: 'Maquina',
          peso:'10kg',

        },
      ],
    },
    {
      slug: 'hombros-abdomen',
      machines: [
        {
          id: 1,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 10,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 2,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 20,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 3,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 30,
          maquina: 'Maquina',
          peso:'10kg',
        },
        {
          id: 4,
          nombre: 'Calentamiento',
          descripcion: 'Ejercicios de calentamiento',
          estado: 'Disponible',
          duracion: 40,
          maquina: 'Maquina',
          peso:'10kg',

        },
      ],
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.rutinaSlug = this.route.snapshot.paramMap.get('slug') ?? '';
    // Aquí puedes cargar los detalles de la rutina usando el slug
  }

  goToPagos() {
    this.router.navigate(['/rutina', this.rutinaSlug, 'pago']);
  }
  gotoPeso(){
  
  }
}
