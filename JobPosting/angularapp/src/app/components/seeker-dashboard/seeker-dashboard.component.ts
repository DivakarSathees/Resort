import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.css']
})
export class SeekerDashboardComponent implements OnInit {
  selectedJob: Job;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(private jobService: JobService) { }

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
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(
      (data) => {
        console.log(data);
        this.jobs = data;
      },
      (error) => {
        console.error('Error retrieving vacationRentals', error);
      }
    );
  }

  viewInfo(vacationRental: any) {
    this.selectedItem = vacationRental;
    this.jobService.getAllUsers().subscribe(users => {
      const user = users.find(user => user.userId === this.selectedItem.userId);
      if (user) {
        this.selectedItem.firstName = user.firstName;
        this.selectedItem.lastName = user.lastName;
        this.selectedItem.email = user.email;
        this.selectedItem.mobileNumber = user.mobileNumber;
      }
      console.log(this.selectedItem);
    });
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  searchText: string = ''; // Declare the 'searchText' property as a string
  sortValue: string = ''; // Declare the 'sortValue' property as a string
  searchJobs() {
    this.jobService.searchJobs(this.searchText).subscribe(eventResponse => {
      this.jobs = eventResponse;
    });
  }

  sortJobs() {
    this.jobService.sortJobs(this.sortValue).subscribe(eventResponse => {
      this.jobs = eventResponse;
    });
  }
}
