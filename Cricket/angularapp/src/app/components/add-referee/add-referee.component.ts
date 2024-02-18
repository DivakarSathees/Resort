import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefereeService } from 'src/app/services/referee.service';

@Component({
  selector: 'app-add-referee',
  templateUrl: './add-referee.component.html',
  styleUrls: ['./add-referee.component.css']  // Add your styles if needed
})
export class AddRefereeComponent implements OnInit {
  refereeForm: FormGroup;
  errorMessage: string;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private refereeService: RefereeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isEditMode = this.route.snapshot.url[1]?.path === 'edit';

    if (this.isEditMode) {
      this.loadRefereeData();
    }
  }

  loadRefereeData(): void {
    const RefereeID = this.route.snapshot.paramMap.get('id');
    this.refereeService.getRefereeById(RefereeID).subscribe(
      (referee) => {
        // Prefill the form with referee data
        this.refereeForm.patchValue({
          RefereeName: referee.RefereeName,
          RefereeImageURL: referee.RefereeImageURL,
          NoOfMatches: referee.NoOfMatches,
          RefereeID: referee.RefereeID
        });
      },
      (error) => {
        console.error('Error fetching referee data', error);
      }
    );
  }

  initializeForm(): void {
    this.refereeForm = this.fb.group({
      RefereeName: ['', Validators.required],
      RefereeImageURL: ['', Validators.required],
      NoOfMatches: ['', Validators.required],
      RefereeID: ['']
    });
  }

  goBack(): void {
    // Add logic to navigate back if needed
    this.router.navigate(['/admin/referee/dashboard']);
  }

  onSubmit(): void {
    if (this.refereeForm.valid) {
      if (this.isEditMode) {
        // Handle updating an existing referee
        const referee = {
          RefereeName: this.refereeForm.get('RefereeName').value,
          RefereeImageURL: this.refereeForm.get('RefereeImageURL').value,
          NoOfMatches: this.refereeForm.get('NoOfMatches').value,
          RefereeID: this.refereeForm.get('RefereeID').value
        };

        this.refereeService.updateReferee(referee).subscribe(
          (response) => {
            console.log('Referee updated successfully', response);
            this.router.navigate(['/admin/referee/dashboard']);
          },
          (error) => {
            console.error('Error updating referee', error);
          }
        );
      } else {
        const referee = {
          RefereeName: this.refereeForm.get('RefereeName').value,
          RefereeImageURL: this.refereeForm.get('RefereeImageURL').value,
          NoOfMatches: this.refereeForm.get('NoOfMatches').value
        };

        this.refereeService.addReferee(referee).subscribe(
          (response) => {
            console.log('Referee added successfully', response);
            this.refereeForm.reset(); // Reset the form
            this.router.navigate(['/admin/referee/dashboard']);
          },
          (error) => {
            console.error('Error adding referee', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
