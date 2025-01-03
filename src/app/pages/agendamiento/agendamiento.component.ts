import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.scss']
})
export class AgendamientoComponent {
  date: Date[] | undefined;

  constructor(private router: Router) {}

  agregarAgendamiento(){
    this.router.navigate(['/agendamiento/registro']);
  }
}
