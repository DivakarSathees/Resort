import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model'; // Make sure to import the correct model
import { TeamService } from 'src/app/services/team.service'; // Assuming you have a service for team operations

@Component({
  selector: 'app-admin-team-dashboard',
  templateUrl: './admin-team-dashboard.component.html',
  styleUrls: ['./admin-team-dashboard.component.css']
})
export class AdminTeamDashboardComponent implements OnInit {

  showDeletePopup = false;
  selectedTeam: Team;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private teamService: TeamService // Make sure to inject the correct service
  ) {}

  navigateToAddTeam() {
    this.router.navigate(['/admin/add/team']);
  }

  teams: Team[] = []; // Assuming Team is the correct model for your teams

  ngOnInit(): void {
    this.getAllTeams();
  }

  navigateToEditTeam(TeamID: { TeamID: number }) {
    console.log('Team to be edited', TeamID);
    this.router.navigate(['/admin/edit/team', TeamID.TeamID]); // Assuming you have a property named teamId in your model
  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe(
      (data) => {
        console.log(data);
        this.teams = data;
      },
      (error) => {
        console.error('Error retrieving teams', error);
      }
    );
  }

  deleteTeam(teamId: number) {
    this.teamService.deleteTeam(teamId).subscribe(
      (response) => {
        console.log('Team deleted successfully', response);
        this.getAllTeams();
      },
      (error) => {
        console.error('Error deleting team', error);
      }
    );
  }
}
