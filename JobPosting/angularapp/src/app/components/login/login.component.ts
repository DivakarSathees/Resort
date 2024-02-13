import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string;

  // loginForm = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  // });

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  onSubmit(loginForm: NgForm) {
    // Validate the form fields before making the login request
    if (loginForm.valid) {
      const credentials = { email: this.email, password: this.password, role:'' };
      this.authService.loginUser(credentials).subscribe(
        (response) => {
          if (response) 
          console.log('Login successful', response);
          // Redirect to a different route after successful login
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userRole', response.role);
          if(response.role=='Job Poster'){
            this.router.navigate(['/job-poster-dashboard']);
          }else if(response.role=='Job Seeker'){
            this.router.navigate(['/job-seeker-dashboard']);
          }
        else{
          this.errorMessage = 'Invalid credentials';
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.router.navigate(['/error']);       
        }
      );
    }else{
      this.errorMessage = 'All fields are required';      
    }
  }
}
