import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InsurancePolicyService } from '../../service/insurance-policy.service';

export const UserGuard: CanActivateFn = (route, state) => {
  inject(InsurancePolicyService).selectedUser$.subscribe(user => {
    if(user) {
      return true;
    }
    else {
      inject(Router).navigate(['/user-list']);
      return true;
    };
  });
  return true;
};
