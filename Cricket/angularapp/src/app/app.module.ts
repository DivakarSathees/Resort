import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { AdminVenueDashboardComponent } from './components/admin-venue-dashboard/admin-venue-dashboard.component';
import { AddVenueComponent } from './components/add-venue/add-venue.component';
import { AdminRefereeDashboardComponent } from './components/admin-referee-dashboard/admin-referee-dashboard.component';
import { AddRefereeComponent } from './components/add-referee/add-referee.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ErrorComponent,
    AdminDashboardComponent,
    NavbarComponent,
    HomeComponent,
    OrganizerDashboardComponent,
    AdminVenueDashboardComponent,
    AddVenueComponent,
    AdminRefereeDashboardComponent,
    AddRefereeComponent
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
