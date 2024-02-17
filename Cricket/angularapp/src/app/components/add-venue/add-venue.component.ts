import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']  // Add your styles if needed
})
export class AddVenueComponent implements OnInit {
  venueForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private venueService: VenueService) { }

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
    this.router.navigate(['/admin/venue/dashboard']);
  }

  onSubmit(): void {
    if (this.venueForm.valid) {
      const venue = {
        VenueName: this.venueForm.get('venueName').value,
        VenueImageURL: this.venueForm.get('venueImage').value,
        VenueDescription: this.venueForm.get('venueDescription').value,
        VenueLocation: this.venueForm.get('venueLocation').value,
        // Add other properties if needed
      };
console.log(venue)
      // Assuming your service method is named addVenue
      this.venueService.addVenue(venue).subscribe(
        (response) => {
          // Handle success if needed
          console.log('Venue added successfully', response);
          this.venueForm.reset(); // Reset the form
          // Navigate to the desired route after successful addition
        },
        (error) => {
          // Handle error if needed
          console.error('Error adding venue', error);
        }
      );    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
