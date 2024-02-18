// team.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']  // Add your styles if needed
})
export class AddTeamComponent implements OnInit {
  teamForm: FormGroup;
  errorMessage: string;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private teamService: TeamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isEditMode = this.route.snapshot.url[1]?.path === 'edit';

    if (this.isEditMode) {
      this.loadTeamData();
    }
  }

  loadTeamData(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
    this.teamService.getTeamById(teamId).subscribe(
      (team) => {
        // Prefill the form with team data
        this.teamForm.patchValue({
          teamName: team.TeamName,
          teamImage: team.TeamImageURL,
          teamDescription: team.TeamDescription,
          teamId: team.TeamId
        });
      },
      (error) => {
        console.error('Error fetching team data', error);
      }
    );
  }

  initializeForm(): void {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamImage: ['', Validators.required],
      teamDescription: ['', Validators.required],
      teamId: ['']
    });
  }

  goBack(): void {
    // Add logic to navigate back if needed
    this.router.navigate(['/admin/team/dashboard']);
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      if (this.isEditMode) {
        // Handle updating an existing team
        const team = {
          TeamName: this.teamForm.get('teamName').value,
          TeamImageURL: this.teamForm.get('teamImage').value,
          TeamDescription: this.teamForm.get('teamDescription').value,
          TeamId: this.teamForm.get('teamId').value
        };

        this.teamService.updateTeam(team).subscribe(
          (response) => {
            console.log('Team updated successfully', response);
            this.router.navigate(['/admin/team/dashboard']);
          },
          (error) => {
            console.error('Error updating team', error);
          }
        );
      } else {
        // Handle creating a new team
        const team = {
          TeamName: this.teamForm.get('teamName').value,
          TeamImageURL: this.teamForm.get('teamImage').value,
          TeamDescription: this.teamForm.get('teamDescription').value
        };

        this.teamService.addTeam(team).subscribe(
          (response) => {
            console.log('Team added successfully', response);
            this.teamForm.reset();
            this.router.navigate(['/admin/team/dashboard']);
          },
          (error) => {
            console.error('Error adding team', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
