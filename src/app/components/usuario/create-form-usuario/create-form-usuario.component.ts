import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-create-form-usuario',
  templateUrl: './create-form-usuario.component.html',
  styleUrls: ['./create-form-usuario.component.scss']
})
export class CreateFormUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  visible: boolean = false;

  showDialog() {
    console.log('Abre dialogo');
    this.visible = true;
  }

  closedDialog() {
    this.visible = false;
  }

  Niveles = [
    { name: 'Principiante', value: 'Principiante' },
    { name: 'Intermedio', value: 'Intermedio' },
    { name: 'Avanzado', value: 'Avanzado' }
  ]

  items: MenuItem[] | undefined;

  maquinas: {
    nombre: string;
    id: string;
  }[] = [];

  filteredEquipos: any[] = [];

  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';

  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      maquina_id: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      nivel: new FormControl<string | null>(null),
      series: new FormControl<number | null>(null),
      repeticiones: new FormControl<number | null>(null),
      descanso: new FormControl<number | null>(null),
      observaciones: new FormControl<string | null>(null),
    });
  }

  ngOnInit() { }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.maquinas as any[]).length; i++) {
      let country = (this.maquinas as { id: string; nombre: string }[])[i];
      if (country.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredEquipos = filtered;
  }
}

