import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model'; // Import the correct model
import { PlayerService } from 'src/app/services/player.service'; // Assuming you have a service for player operations

@Component({
  selector: 'app-admin-player-dashboard',
  templateUrl: './admin-player-dashboard.component.html',
  styleUrls: ['./admin-player-dashboard.component.css']
})
export class AdminPlayerDashboardComponent implements OnInit {

  showDeletePopup = false;
  selectedPlayer: Player;

  constructor(
    private router: Router,
    private playerService: PlayerService // Make sure to inject the correct service
  ) {}

  players: Player[] = []; // Assuming Player is the correct model for your players

  ngOnInit(): void {

    this.getAllPlayers();
  }

  navigateToAddPlayer() {
    this.router.navigate(['/admin/add/player']);
  }

  navigateToEditPlayer(player: {PlayerId:number}) {
    console.log('Player to be edited', player);
    this.router.navigate(['/admin/edit/player', player.PlayerId]); // Assuming you have a property named PlayerId in your model
  }

  getAllPlayers() {
    this.playerService.getAllPlayers().subscribe(
      (data) => {
        console.log(data);
        const selectedTeamId = localStorage.getItem('selectedTeamId');

        this.players = data.filter(player => player.TeamId == parseInt(selectedTeamId, 10));

        // this.players = data;
      },
      (error) => {
        console.error('Error retrieving players', error);
      }
    );
  }

  deletePlayer(playerId: number) {
    this.playerService.deletePlayer(playerId).subscribe(
      (response) => {
        console.log('Player deleted successfully', response);
        this.getAllPlayers();
      },
      (error) => {
        console.error('Error deleting player', error);
      }
    );
  }
}
