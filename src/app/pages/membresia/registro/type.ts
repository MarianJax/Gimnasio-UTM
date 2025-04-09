// Definir los tipos para Jornada y Estado
type Jornada = 'Matutina' | 'Vespertina' | 'Nocturna'; // Añade más jornadas si las necesitas
type Estado = 'disponible'; // Otros estados pueden ser añadidos más adelante si es necesario

// Definir la estructura de los horarios
export interface Horario {
  dia_semana: string;
  hora_inicio: string; // Formato HH:MM:SS
  hora_fin: string; // Formato HH:MM:SS
  jornada: Jornada;
}

// Definir la estructura de los intervalos de tiempo que se generarán
export interface Intervalo {
  jornada: Jornada;
  hora_inicio: string; // Formato HH:MM
  hora_fin: string; // Formato HH:MM
  estado: Estado;
}
