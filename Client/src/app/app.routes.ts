import { Routes } from '@angular/router';
import { InsurancePolicyFormComponent } from './insurance-policy-form/insurance-policy-form.component';
import { UserDetailsComponentComponent } from './user-details-component/user-details-component.component';
import { UserListComponentComponent } from './user-list-component/user-list-component.component';
import { UserGuard } from './user-details-component/guard/user.guard';

export const routes: Routes = [
  { path: 'user-details', component: UserDetailsComponentComponent,canActivate: [UserGuard] },
  { path: 'user-list', component: UserListComponentComponent},
  { path: '', redirectTo: '/user-list', pathMatch: 'full'},
  { path: '**', redirectTo: '/user-list'}

];
