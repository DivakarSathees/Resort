import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {
  jobForm: FormGroup;
  job: Job
  photoImage = "";
  errorMessage = '';

  constructor(private fb: FormBuilder, private jobService: JobService, private route: Router) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      coverImage: [null, Validators.required],
    });
  }

  categories = ['Teaching and Education', 'Technology and IT', 'Healthcare and Medical', 'Business and Finance', 'Other'];

  onSubmit() {
    if (this.jobForm.valid) {
      // Call the service method to post the product
      console.log(this.jobForm.value);
      //pass userid from local storage
      // this.jobForm.value.userId=localStorage.getItem('userId');
      this.job = new Job();
      this.job.title = this.jobForm.get('title').value;
      this.job.category = this.jobForm.get('category').value;
      this.job.startDate = this.jobForm.get('startDate').value;
      this.job.location = this.jobForm.get('location').value;
      this.job.endDate = this.jobForm.get('endDate').value;
      this.job.description = this.jobForm.get('description').value;
      this.job.coverImage = this.photoImage;
      this.job.userId = localStorage.getItem('userId');
      this.jobService.addJob(this.job).subscribe(
        (response) => {
          // Handle success if needed
          console.log('job added successfully', response);
          this.jobForm.reset(); // Reset the form
          this.route.navigate(['/job-poster-dashboard']);
        },
        (error) => {
          // Handle error if needed
          console.error('Error adding job', error);
        }
      );
    } else {
      this.errorMessage = "All fields are required"
    }
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertFileToBase64(file).then(
        (base64String) => {
          this.photoImage = base64String
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          // Handle error appropriately
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  goBack() {
    // Navigate to the dashboard or any desired route
    this.route.navigate(['/job-poster-dashboard']);
  }
}
