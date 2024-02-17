import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venue } from 'src/app/models/venue.model';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-admin-venue-dashboard',
  templateUrl: './admin-venue-dashboard.component.html',
  styleUrls: ['./admin-venue-dashboard.component.css']
})
export class AdminVenueDashboardComponent implements OnInit {

  showDeletePopup = false;
  selectedVenue: Venue;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private venueService: VenueService
  ) {}

  navigateToAddVenue() {
    this.router.navigate(['/add-venue']);
  }

  venues: any[] = []; // Declare the 'vacationRentals' property as an array of any type

  ngOnInit(): void {
    // when add vacationRental button is clicked, trigger this function getBooksByUserId()
    this.getVenuesByUserId();
  }

  navigateToEditVenue(jobId: { jobId: number }) {
    console.log('Venue Id to be edited', jobId);
    this.router.navigate(['/edit-job', jobId.jobId]);
  }

  getVenuesByUserId() {
    this.venueService.getVenuesByUserId().subscribe(
      (data) => {
        console.log(data);
        this.venues = data;
      },
      (error) => {
        console.error('Error retrieving cricket tournaments', error);
      }
    );
  }

  deleteVenue(VenueId: string) {
    this.venueService.deleteVenue(VenueId).subscribe(
      (response) => {
        console.log('Venue deleted successfully', response);
        this.getVenuesByUserId();
      },
      (error) => {
        console.error('Error deleting job', error);
      }
    );
  }

  viewInfo(Venue: any) {
    console.log(Venue);
    this.selectedItem = Venue;
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
