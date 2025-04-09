import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinasService } from '../../../service/rutinas/rutinas.service';


@Component({
  selector: 'app-rutina-detail',
  templateUrl: './rutina-detail.component.html',
  styleUrls: ['./rutina-detail.component.scss'],
})
export class RutinaDetailComponent implements OnInit {
  rutina: any = {};
  rutinaSlug: string = '';

  rutinaItems = [

    {
      "nombre": "Pecho / Triceps",
      "intensidad": "Normal",
      "slug": "pecho-triceps",
      "descripcion": "Ejercicios enfocados en desarrollar fuerza y masa muscular en el pecho y tríceps.",
      "ejercicios": [
        {
          "id": 1,
          "nombre": "Press de Banca",
          "descripcion": "Ejercicio fundamental para el desarrollo del pecho",
          "series": 4,
          "repeticiones": "12-15",
          "descanso": "60-90 segundos",
          "maquina": "Banco de Press de Banca",
          "nivel": "Intermedio"
        },
        {
          "id": 2,
          "nombre": "Press Inclinado",
          "descripcion": "Variación para enfocarse en la parte superior del pecho",
          "series": 3,
          "repeticiones": "12",
          "descanso": "60-90 segundos",
          "maquina": "Banco Inclinado",
          "nivel": "Intermedio"
        },
        {
          "id": 3,
          "nombre": "Aperturas con Mancuernas",
          "descripcion": "Ejercicio de aislamiento para el pecho",
          "series": 3,
          "repeticiones": "15",
          "descanso": "60 segundos",
          "maquina": "Mancuernas",
          "nivel": "Principiante"
        }
      ]
    },
    {
      "nombre": "Brazos",
      "intensidad": "Normal",
      "slug": "brazos",
      "descripcion": "Ejercicios enfocados en desarrollar fuerza y volumen en los bíceps y tríceps.",
      "ejercicios": [
        {
          "id": 1,
          "nombre": "Curl de Bíceps",
          "descripcion": "Ejercicio para fortalecer los bíceps",
          "series": 3,
          "repeticiones": "12-15",
          "descanso": "60 segundos",
          "maquina": "Máquina de Curl de Bíceps",
          "nivel": "Principiante"
        },
        {
          "id": 2,
          "nombre": "Curl en Banco Inclinado",
          "descripcion": "Variante para trabajar los bíceps de forma diferente",
          "series": 3,
          "repeticiones": "12",
          "descanso": "60 segundos",
          "maquina": "Banco Inclinado",
          "nivel": "Intermedio"
        },
        {
          "id": 3,
          "nombre": "Extensiones de Tríceps en Polea Alta",
          "descripcion": "Trabajo de aislamiento para los tríceps",
          "series": 3,
          "repeticiones": "15",
          "descanso": "60 segundos",
          "maquina": "Polea Alta",
          "nivel": "Principiante"
        },
        {
          "id": 4,
          "nombre": "Fondos en Paralelas",
          "descripcion": "Ejercicio de empuje para trabajar los tríceps",
          "series": 3,
          "repeticiones": "10-12",
          "descanso": "60 segundos",
          "maquina": "Paralelas",
          "nivel": "Intermedio"
        }
      ]
    },
    {
      "nombre": "Pierna",
      "intensidad": "Alta",
      "slug": "pierna",
      "descripcion": "Ejercicios centrados en desarrollar fuerza y masa muscular en las piernas, trabajando cuádriceps, isquiotibiales y glúteos.",
      "ejercicios": [
        {
          "id": 1,
          "nombre": "Sentadillas",
          "descripcion": "Ejercicio compuesto para trabajar todo el tren inferior",
          "series": 4,
          "repeticiones": "10-12",
          "descanso": "90 segundos",
          "maquina": "Barra Olímpica",
          "nivel": "Intermedio"
        },
        {
          "id": 2,
          "nombre": "Prensa de Pierna",
          "descripcion": "Ejercicio para enfocar el trabajo en cuádriceps y glúteos",
          "series": 4,
          "repeticiones": "12",
          "descanso": "90 segundos",
          "maquina": "Máquina de Prensa de Pierna",
          "nivel": "Intermedio"
        },
        {
          "id": 3,
          "nombre": "Extensiones de Pierna",
          "descripcion": "Trabajo de aislamiento para los cuádriceps",
          "series": 3,
          "repeticiones": "15",
          "descanso": "60 segundos",
          "maquina": "Máquina de Extensiones de Pierna",
          "nivel": "Principiante"
        },
        {
          "id": 4,
          "nombre": "Curl de Pierna",
          "descripcion": "Ejercicio enfocado en los isquiotibiales",
          "series": 3,
          "repeticiones": "12",
          "descanso": "60 segundos",
          "maquina": "Máquina de Curl de Pierna",
          "nivel": "Principiante"
        }
      ]
    },
    {
      "nombre": "Glúteo",
      "intensidad": "Alta",
      "slug": "gluteo",
      "descripcion": "Ejercicios centrados en desarrollar fuerza y tono muscular en los glúteos.",
      "ejercicios": [
        {
          "id": 1,
          "nombre": "Hip Thrust",
          "descripcion": "Ejercicio para trabajar los glúteos de forma efectiva",
          "series": 4,
          "repeticiones": "12-15",
          "descanso": "90 segundos",
          "maquina": "Barra Olímpica",
          "nivel": "Intermedio"
        },
        {
          "id": 2,
          "nombre": "Elevación de Cadera",
          "descripcion": "Trabajo de aislamiento para los glúteos",
          "series": 3,
          "repeticiones": "12",
          "descanso": "60 segundos",
          "maquina": "Máquina de Elevación de Cadera",
          "nivel": "Intermedio"
        },
        {
          "id": 3,
          "nombre": "Sentadillas Sumo",
          "descripcion": "Variante de sentadilla enfocada en los glúteos",
          "series": 4,
          "repeticiones": "12",
          "descanso": "90 segundos",
          "maquina": "Barra Olímpica",
          "nivel": "Intermedio"
        },
        {
          "id": 4,
          "nombre": "Curl de Pierna Acostado",
          "descripcion": "Aislamiento para los isquiotibiales y glúteos",
          "series": 3,
          "repeticiones": "12",
          "descanso": "60 segundos",
          "maquina": "Máquina de Curl de Pierna Acostado",
          "nivel": "Principiante"
        }
      ]
    },
    {
      "nombre": "Espalda / Bíceps",
      "intensidad": "Alta",
      "slug": "espalda-biceps",
      "descripcion": "Ejercicios para trabajar la espalda y los bíceps, enfocados en mejorar la fuerza y el tamaño muscular.",
      "ejercicios": [
        {
          "id": 1,
          "nombre": "Pull-up",
          "descripcion": "Ejercicio para trabajar toda la espalda y bíceps",
          "series": 4,
          "repeticiones": "8-10",
          "descanso": "90 segundos",
          "maquina": "Barra de Pull-up",
          "nivel": "Avanzado"
        },
        {
          "id": 2,
          "nombre": "Remo con Barra",
          "descripcion": "Trabajo de espalda y bíceps con barra",
          "series": 4,
          "repeticiones": "12",
          "descanso": "90 segundos",
          "maquina": "Barra Olímpica",
          "nivel": "Intermedio"
        },
        {
          "id": 3,
          "nombre": "Curl de Bíceps con Barra",
          "descripcion": "Ejercicio para bíceps con barra",
          "series": 3,
          "repeticiones": "12-15",
          "descanso": "60 segundos",
          "maquina": "Barra Olímpica",
          "nivel": "Principiante"
        },
        {
          "id": 4,
          "nombre": "Curl en Máquina de Bíceps",
          "descripcion": "Aislamiento para los bíceps con máquina",
          "series": 3,
          "repeticiones": "12",
          "descanso": "60 segundos",
          "maquina": "Máquina de Curl de Bíceps",
          "nivel": "Principiante"
        }
      ]
    },
    {
      "nombre": "Hombros / Abdomen",
      "intensidad": "Normal",
      "slug": "hombros-abdomen",
      "descripcion": "Ejercicios enfocados en el desarrollo de los hombros y abdomen.",
      "ejercicios": [
        {
          "id": 1,
          "nombre": "Press Militar",
          "descripcion": "Trabajo de hombros con barra",

          "series": 4,
          "repeticiones": "10-12",
          "descanso": "90 segundos",
          "maquina": "Barra Olímpica",
          "nivel": "Intermedio"
        },
        {
          "id": 2,
          "nombre": "Elevaciones Laterales",
          "descripcion": "Aislamiento para los deltoides laterales",
          "series": 3,
          "repeticiones": "12-15",
          "descanso": "60 segundos",
          "maquina": "Mancuernas",
          "nivel": "Principiante"
        },
        {
          "id": 3,
          "nombre": "Crunch en Máquina",
          "descripcion": "Trabajo abdominal en máquina para mayor aislamiento",
          "series": 3,
          "repeticiones": "15",
          "descanso": "60 segundos",
          "maquina": "Máquina de Crunch",
          "nivel": "Principiante"
        },
        {
          "id": 4,
          "nombre": "Plancha",
          "descripcion": "Ejercicio de abdomen con enfoque en resistencia",
          "series": 3,
          "repeticiones": "30-60 segundos",
          "descanso": "60 segundos",
          "maquina": "Ninguna",
          "nivel": "Intermedio"
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private rutinasService: RutinasService) { }
  selectpeso!: any;
  ngOnInit(): void {
    this.rutinaSlug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.rutinasService.obtenerRutina(this.rutinaSlug).subscribe(data => {
      this.rutina = data;
    });
  }
  
  ObtenerNombreMaquinas(maquina: {id: string, nombre:string}[]) {
    return maquina.map(m => m.nombre).join(', ');
  }
}
