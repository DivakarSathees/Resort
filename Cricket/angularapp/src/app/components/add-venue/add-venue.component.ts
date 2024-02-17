import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']  // Add your styles if needed
})
export class AddVenueComponent implements OnInit {
  venueForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.venueForm = this.fb.group({
      venueName: ['', Validators.required],
      venueImage: ['', Validators.required],
      venueDescription: ['', Validators.required],
      venueLocation: ['', Validators.required]
    });
  }

  goBack(): void {
    // Add logic to navigate back if needed
  }

  onSubmit(): void {
    if (this.venueForm.valid) {
      // Add logic to handle form submission
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
