import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';


export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toaster: NgToastService = inject(NgToastService);
  if (authService.isLoggedIn()){
    const userRole = authService.getRoleFromToken()
    if (userRole === 'Admin'){
      return true;
    }
    else{
      toaster.error({detail:"ERROR", summary:"You don't have permission to access this page.", duration:5000});
      router.navigate(['dashboard']);
      return false
    }
  }
  else{
    toaster.error({detail:"ERROR", summary:"Please login as admin first.", duration:5000});
    router.navigate(['login']);
    return false;
  }
};
