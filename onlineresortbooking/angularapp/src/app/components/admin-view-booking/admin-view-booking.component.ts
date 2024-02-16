import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-admin-view-booking',
  templateUrl: './admin-view-booking.component.html',
  styleUrls: ['./admin-view-booking.component.css']
})
export class AdminViewBookingComponent implements OnInit {

  showDeletePopup = false;
  selectedBooking: Booking; 
  
  constructor( private bookingService: BookingService) { }

  bookings: any[] = []; // Declare the 'mobiles' property as an array of any type

  ngOnInit(): void {
    //when add mobile button is clicked, trigger this function getMobilesByUserId()
    this.getAllBookings();
    //get userid from local storage
  }

  getAllBookings() {
    this.bookingService.getAllBookings().subscribe((response: any) => {
      this.bookings = response;
      console.log(this.bookings);
      //pass userid from local storage to bookings
      // JSON.parse(localStorage.getItem('userId'))
    });
  }

  deleteBooking(mobileId: number) {
    this.bookingService.deleteBooking(mobileId).subscribe(
      (response) => {
        console.log('Mobile deleted successfully', response);
        this.getAllBookings();
      },
      (error) => {
        console.error('Error deleting mobile', error);
      }
    );
  }

  approveBooking(booking): void {
    booking.bookingStatus = 'APPROVED';
    // Call your PUT method here to save the changes to the server
    this.bookingService.updateBooking(booking).subscribe(
      (response) => {
        console.log('Booking updated successfully', response);
        this.getAllBookings();
      },
      (error) => {
        console.error('Error updating booking', error);
      }
    );
  }
  
  rejectBooking(booking): void {
    booking.bookingStatus = 'REJECTED';
    // Call your PUT method here to save the changes to the server
    this.bookingService.updateBooking(booking).subscribe(
      (response) => {
        console.log('Booking updated successfully', response);
        this.getAllBookings();
      },
      (error) => {
        console.error('Error updating booking', error);
      }
    );
  }

}
