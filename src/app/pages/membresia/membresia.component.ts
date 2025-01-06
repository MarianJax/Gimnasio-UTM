import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({

  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent {

  date: Date[] | undefined;

  constructor(private router: Router) {}
  agregarmembresia(){
    this.router.navigate(['/membresia/registro']);
  }
}
