import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-poster-dashboard',
  templateUrl: './poster-dashboard.component.html',
  styleUrls: ['./poster-dashboard.component.css']
})
export class PosterDashboardComponent implements OnInit {
  showDeletePopup = false;
  selectedJob: Job;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private jobService: JobService
  ) {}

  navigateToAddJob() {
    this.router.navigate(['/add-job']);
  }
  logout() {
    // Perform logout logic here
    // For example, clear user authentication, navigate to the login page, etc.
    console.log('Logout clicked');
    // For demonstration purposes, let's navigate to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
  }

  jobs: any[] = []; // Declare the 'vacationRentals' property as an array of any type

  ngOnInit(): void {
    // when add vacationRental button is clicked, trigger this function getBooksByUserId()
    this.getJobsByUserId();
  }

  navigateToEditJob(jobId: { jobId: number }) {
    console.log('Job Id to be edited', jobId);
    this.router.navigate(['/edit-job', jobId.jobId]);
  }

  getJobsByUserId() {
    this.jobService.getJobsByUserId().subscribe(
      (data) => {
        console.log(data);
        this.jobs = data;
      },
      (error) => {
        console.error('Error retrieving cricket tournaments', error);
      }
    );
  }

  deleteJob(JobId: string) {
    this.jobService.deleteJob(JobId).subscribe(
      (response) => {
        console.log('Job deleted successfully', response);
        this.getJobsByUserId();
      },
      (error) => {
        console.error('Error deleting job', error);
      }
    );
  }

  viewInfo(Job: any) {
    console.log(Job);
    this.selectedItem = Job;
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  searchText: string = ''; // Declare the 'searchText' property as a string
  sortValue: string = ''; // Declare the 'sortValue' property as a string
  searchJobsByUserId() {
    this.jobService
      .searchJobsByUserId(this.searchText)
      .subscribe((Job) => {
        this.jobs = Job;
      });
  }

}
