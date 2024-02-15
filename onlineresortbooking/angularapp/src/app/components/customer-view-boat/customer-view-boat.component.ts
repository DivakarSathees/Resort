import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoatService } from 'src/app/services/boat.service';

@Component({
  selector: 'app-customer-view-boat',
  templateUrl: './customer-view-boat.component.html',
  styleUrls: ['./customer-view-boat.component.css']
})
export class CustomerViewBoatComponent implements OnInit {
  boats: any = [];

  constructor( private boatService: BoatService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBoats();
  }

  getAllBoats() {
    this.boatService.getAllBoats().subscribe((response: any) => {
      console.log(response);
      this.boats = response;
    });
  }

  navigateToAddBooking(){
    this.router.navigate(['/customer/add/booking']);
    // console.log(boat.boatId);
  }
}
