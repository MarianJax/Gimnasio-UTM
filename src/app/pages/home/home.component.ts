import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RutinasService } from '../../service/rutinas/rutinas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToRutinas() {
    this.router.navigate(['/']);
  }
}
