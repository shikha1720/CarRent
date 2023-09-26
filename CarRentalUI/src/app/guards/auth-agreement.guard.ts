import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { inject } from '@angular/core';

export const authAgreementGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toaster: NgToastService = inject(NgToastService);
  // const userRole = this.authService.getRoleFromToken()
  if (authService.isLoggedIn()){
    const userRole = authService.getRoleFromToken()
    if (userRole === 'user'){
      return true;
    }
    else{
      toaster.error({detail:"ERROR", summary:"Only user can access this page.", duration:5000});
      router.navigate(['dashboard']);
      return false
    }
  }
  else{
    toaster.error({detail:"ERROR", summary:"Please login as user first.", duration:5000});
    router.navigate(['login']);
    return false;
  }
};
