import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { TripPlannerComponent } from './trip-planner/trip-planner';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'trip-planner', component: TripPlannerComponent },
  { path: '**', redirectTo: '/login' }
];