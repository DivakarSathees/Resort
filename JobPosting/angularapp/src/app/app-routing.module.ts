import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SeekerDashboardComponent } from './components/seeker-dashboard/seeker-dashboard.component';
import { PosterDashboardComponent } from './components/poster-dashboard/poster-dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'job-seeker-dashboard', component: SeekerDashboardComponent},
  { path: 'job-poster-dashboard', component: PosterDashboardComponent},
  { path: 'add-job', component: AddJobComponent},
  { path: 'edit-job/:id', component: EditJobComponent},
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
