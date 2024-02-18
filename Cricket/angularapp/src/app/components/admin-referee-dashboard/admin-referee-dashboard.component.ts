import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Referee } from 'src/app/models/referee.model'; // Make sure to import the correct model
import { RefereeService } from 'src/app/services/referee.service'; // Assuming you have a service for referee operations

@Component({
  selector: 'app-admin-referee-dashboard',
  templateUrl: './admin-referee-dashboard.component.html',
  styleUrls: ['./admin-referee-dashboard.component.css']
})
export class AdminRefereeDashboardComponent implements OnInit {

  showDeletePopup = false;
  selectedReferee: Referee;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private refereeService: RefereeService // Make sure to inject the correct service
  ) {}

  navigateToAddReferee() {
    this.router.navigate(['/admin/add/referee']);
  }

  referees: Referee[] = []; // Assuming Referee is the correct model for your referees

  ngOnInit(): void {
    this.getAllReferees();
  }

  navigateToEditReferee(RefereeID: { RefereeID: number}) {
    console.log('Referee to be edited', RefereeID);
    this.router.navigate(['/admin/edit/referee', RefereeID.RefereeID]); // Assuming you have a property named refereeId in your model
  }

  getAllReferees() {
    this.refereeService.getAllReferees().subscribe(
      (data) => {
        console.log(data);
        this.referees = data;
      },
      (error) => {
        console.error('Error retrieving referees', error);
      }
    );
  }

  deleteReferee(refereeId: number) {
    this.refereeService.deleteReferee(refereeId).subscribe(
      (response) => {
        console.log('Referee deleted successfully', response);
        this.getAllReferees();
      },
      (error) => {
        console.error('Error deleting referee', error);
      }
    );
  }
}
