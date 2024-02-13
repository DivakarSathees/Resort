import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
      
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
}) 
export class EditJobComponent implements OnInit {
  job: any = {};
  photoImage="";
  constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router) { }

  categories = ['Teaching and Education', 'Technology and IT', 'Healthcare and Medical', 'Business and Finance', 'Other'];

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    console.log('Job Id to be edited', jobId);
    this.getJobsById(jobId);
  }

getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substring(0, 10); // "yyyy-MM-dd"
    return formattedDate;
  }
  

  getJobsById(id: string) {
    this.jobService.getJobsById(id).subscribe(
      (response) => {
        this.job = response;
        this.job.startDate = this.getFormattedDate(this.job.startDate);
        this.job.endDate = this.getFormattedDate(this.job.endDate);
        console.log(response)
      },
      (error) => {
        console.error('Error retrieving job', error);
      }
    );
  }

  updateJob() {
    this.job.coverImage=this.photoImage;
    this.jobService.updateJob(this.job).subscribe(
      (response) => {
        console.log('Job updated successfully', response);
        //navigate to seller dashboard
        this.router.navigate(['/job-poster-dashboard']);
      },
      (error) => {
        console.error('Error updating job', error);
      }
    );
 }

 
 goBack(): void {
  // Navigate to the dashboard or any desired route
  this.router.navigate(['/job-poster-dashboard']);
}

 handleFileChange(event: any): void {
  const file = event.target.files[0];

  if (file) {
    this.convertFileToBase64(file).then(
      (base64String) => {
        this.photoImage=base64String
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



}
