import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  playerForm: FormGroup;
  errorMessage: string;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private playerService: PlayerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeForm();
    this.isEditMode = this.route.snapshot.url[1]?.path === 'edit';

    if (this.isEditMode) {
      this.loadPlayerData();
    }
  }

  loadPlayerData(): void {
    const playerId = this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayerById(playerId).subscribe(
      (player) => {
        // Prefill the form with player data
        this.playerForm.patchValue({
          PlayerName: player.PlayerName,
          Age: player.Age,
          Country: player.Country,
          BattingStyle: player.BattingStyle,
          BowlingStyle: player.BowlingStyle,
          DateOfBirth: player.DateOfBirth,
          Role: player.Role,
          TotalMatchesPlayed: player.TotalMatchesPlayed,
          TotalRunsScored: player.TotalRunsScored,
          TotalWicketsTaken: player.TotalWicketsTaken,
          TotalCatches: player.TotalCatches,
          PlayerId: player.PlayerId
        });
      },
      (error) => {
        console.error('Error fetching player data', error);
      }
    );
  }

  initializeForm(): void {
    this.playerForm = this.fb.group({
      PlayerName: ['', Validators.required],
      Age: ['', Validators.required],
      Country: ['', Validators.required],
      BattingStyle: ['', Validators.required],
      BowlingStyle: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Role: ['', Validators.required],
      TotalMatchesPlayed: ['', Validators.required],
      TotalRunsScored: ['', Validators.required],
      TotalWicketsTaken: ['', Validators.required],
      TotalCatches: ['', Validators.required],
      PlayerId: ['']
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/player/dashboard']);
  }

  onSubmit(): void {
    if (this.playerForm.valid) {
      if (this.isEditMode) {
        const player = this.playerForm.value;
        this.playerService.updatePlayer(player).subscribe(
          (response) => {
            console.log('Player updated successfully', response);
            this.router.navigate(['/admin/player/dashboard']);
          },
          (error) => {
            console.error('Error updating player', error);
          }
        );
      } else {
        const player = this.playerForm.value;
        this.playerService.addPlayer(player).subscribe(
          (response) => {
            console.log('Player added successfully', response);
            this.playerForm.reset();
            this.router.navigate(['/admin/player/dashboard']);
          },
          (error) => {
            console.error('Error adding player', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
