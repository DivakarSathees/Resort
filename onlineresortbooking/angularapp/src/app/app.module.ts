import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddBoatComponent } from './components/add-boat/add-boat.component';
import { AdminViewBoatComponent } from './components/admin-view-boat/admin-view-boat.component';
import { AdminViewBookingComponent } from './components/admin-view-booking/admin-view-booking.component';
import { CustomerViewBookingComponent } from './components/customer-view-booking/customer-view-booking.component';
import { CustomerViewBoatComponent } from './components/customer-view-boat/customer-view-boat.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    HomeComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    NavbarComponent,
    AddBoatComponent,
    AdminViewBoatComponent,
    AdminViewBookingComponent,
    CustomerViewBookingComponent,
    CustomerViewBoatComponent,
    AddBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
