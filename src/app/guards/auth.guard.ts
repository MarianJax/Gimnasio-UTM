import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../pages/login/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.isAuthenticated() ? true : redirectToLogin();
};

const redirectToLogin = () => {
  const router = inject(Router);
  // Logic to redirect to the login page
  console.log('Redirecting to login page...');
  router.navigate(['/auth/login']);
  return false; // Prevent navigation
}
