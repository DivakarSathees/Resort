import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/authguard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AddBoatComponent } from './components/add-boat/add-boat.component';
import { AdminViewBookingComponent } from './components/admin-view-booking/admin-view-booking.component';
import { AdminViewBoatComponent } from './components/admin-view-boat/admin-view-boat.component';
import { CustomerViewBoatComponent } from './components/customer-view-boat/customer-view-boat.component';
import { CustomerViewBookingComponent } from './components/customer-view-booking/customer-view-booking.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'admin/add/boat', component: AddBoatComponent, canActivate: [AuthGuard]},
  { path: 'admin/view/boat', component: AdminViewBoatComponent, canActivate: [AuthGuard]},
  { path: 'admin/view/bookings', component: AdminViewBookingComponent, canActivate: [AuthGuard]},
  { path: 'customer/view/boat', component: CustomerViewBoatComponent, canActivate: [AuthGuard]},
  { path: 'customer/add/booking', component: AddBookingComponent, canActivate: [AuthGuard]},
  { path: 'customer/view/bookings', component: CustomerViewBookingComponent, canActivate: [AuthGuard]},
  { path: 'error', component: ErrorComponent, data: { message: 'Oops! Something went wrong.' }},
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
