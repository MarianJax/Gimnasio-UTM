import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamiento-info',
  templateUrl: './agendamiento-info.component.html',
  styleUrls: ['./agendamiento-info.component.scss']
})
export class AgendamientoInfoComponent {
  fechaAgendamiento: string = '';
  horaInicio: string = '';
  horaFin: string = '';
}
