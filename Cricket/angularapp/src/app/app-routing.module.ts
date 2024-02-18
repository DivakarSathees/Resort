import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminVenueDashboardComponent } from './components/admin-venue-dashboard/admin-venue-dashboard.component';
import { AddVenueComponent } from './components/add-venue/add-venue.component';
import { AddRefereeComponent } from './components/add-referee/add-referee.component';
import { AdminRefereeDashboardComponent } from './components/admin-referee-dashboard/admin-referee-dashboard.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminTeamDashboardComponent } from './components/admin-team-dashboard/admin-team-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'admin/venue/dashboard', component: AdminVenueDashboardComponent },
  { path: 'admin/add/venue', component: AddVenueComponent },
  { path: 'admin/edit/venue/:id', component: AddVenueComponent },
  { path: 'admin/referee/dashboard', component: AdminRefereeDashboardComponent },
  { path: 'admin/add/referee', component: AddRefereeComponent },
  { path: 'admin/edit/referee/:id', component: AddRefereeComponent },
  { path: 'admin/team/dashboard', component: AdminTeamDashboardComponent },
  { path: 'admin/add/teamteam', component: AddTeamComponent },
  { path: 'admin/edit/referee/:id', component: AddTeamComponent },
  { path: 'error', component: ErrorComponent, data: { message: 'Oops! Something went wrong.' }},
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
