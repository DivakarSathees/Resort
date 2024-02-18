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
    this.router.navigate(['/admin/add/venue']);
  }

  venues: any[] = []; // Declare the 'vacationRentals' property as an array of any type

  ngOnInit(): void {
    // when add vacationRental button is clicked, trigger this function getBooksByUserId()
    this.getAllVenues();
  }

  navigateToEditVenue(VenueId: { VenueId: number }) {
    console.log('Venue Id to be edited', VenueId);
    this.router.navigate(['/admin/edit/venue', VenueId.VenueId]);
  }

  getAllVenues() {
    this.venueService.getAllVenues().subscribe(
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
        this.getAllVenues();
      },
      (error) => {
        console.error('Error deleting job', error);
      }
    );
  }
}
