import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.scss'],
})
export class AgendamientoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToRutinas() {
    this.router.navigate(['/']);
  }
}
