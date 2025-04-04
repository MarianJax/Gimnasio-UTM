import { CanActivateFn } from '@angular/router';
import { AuthService } from '../pages/login/auth.service';
import { inject } from '@angular/core';

export const hasRolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const expectedRole: string[] = route.data['expectedRole'];
  // Check if the user is authenticated
  const userRoles = authService.getUserData().roles;
  return expectedRole.some(role => userRoles.includes(role));
};
