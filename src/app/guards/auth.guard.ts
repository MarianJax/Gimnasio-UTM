import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private api: ApiService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    console.log('AuthGuard#canActivate called');

    //if (this.api.isLoggedIn()) { return true };
    return true;

    console.log('AuthGuard#canActivate not authorized to access page');
    // Can store current route and redirect back to it
    // Store it in a service, add it to a query param
    this.router.navigate(['/']);

    return false;
  }

}
