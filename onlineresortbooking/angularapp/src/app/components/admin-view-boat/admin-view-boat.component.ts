import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Boat } from 'src/app/models/boat.model';
import { BoatService } from 'src/app/services/boat.service';

@Component({
  selector: 'app-admin-view-boat',
  templateUrl: './admin-view-boat.component.html',
  styleUrls: ['./admin-view-boat.component.css']
})
export class AdminViewBoatComponent implements OnInit {
  showDeletePopup = false;
  selectedBoat: Boat; 
  selectedItem: any = {};
  isEditing = false; 
  boats: any[] = [];

  constructor(private router: Router, private boatService: BoatService) { }

  ngOnInit(): void {
    this.getAllBoats();
  }

  getAllBoats() {
    this.boatService.getAllBoats().subscribe(
      (data: any) => {
        this.boats = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteBoat(boatDetails: any) {
    this.boatService.deleteBoat(boatDetails.boatId).subscribe(
      (data: any) => {
        console.log('Boat deleted successfully', data);
        this.getAllBoats();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editBoat(boat: Boat) {
    // Set the selected boat and enter edit mode
    this.selectedBoat = boat; // Create a copy to avoid direct modification
    this.isEditing = true;
  }

  updateBoat(boatDetails: any) {
    // Implement your update logic here, using the boatService.put() method
    this.boatService.updateBoat(boatDetails).subscribe(
      (data: any) => {
        console.log('Boat updated successfully', data);
        this.getAllBoats();
        this.cancelEdit(); // Exit edit mode after successful update
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedBoat = null;
  }

}
