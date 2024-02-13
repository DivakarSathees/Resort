import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PosterDashboardComponent } from './components/poster-dashboard/poster-dashboard.component';
import { SeekerDashboardComponent } from './components/seeker-dashboard/seeker-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddJobComponent } from './components/add-job/add-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    RegistrationComponent,
    PosterDashboardComponent,
    SeekerDashboardComponent,
    AddJobComponent,
    EditJobComponent
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
