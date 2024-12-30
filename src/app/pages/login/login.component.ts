import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarioForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      usuario: [''],
      password: ['']
    });
  }

  onLogin() {
    if (this.usuarioForm.valid) {
      console.log('onLogin');
      this.router.navigate(['/']); // Redirect to 'home' route
    } else {
      console.log('Form is invalid');
    }
  }
}