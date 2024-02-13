import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm: FormGroup;
  user: User
  errorMessage = ''

  roles = ['Job Seeker', 'Job Poster'];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      role: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // const formData = this.registrationForm.value;
      this.user = new User();
      this.user.firstName = this.registrationForm.get('firstName').value;
      this.user.lastName = this.registrationForm.get('lastName').value;
      this.user.mobileNumber = this.registrationForm.get('mobileNumber').value;
      this.user.email = this.registrationForm.get('email').value;
      this.user.role = this.registrationForm.get('role').value;
      this.user.password = this.registrationForm.get('password').value;
      this.authService.registerUser(this.user).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
          // Redirect or perform other actions after successful registration
        },
        (error) => {
          console.error('Registration failed', error);
          // Handle error messages or display to the user
        }
      );
    }
    
  }

}
