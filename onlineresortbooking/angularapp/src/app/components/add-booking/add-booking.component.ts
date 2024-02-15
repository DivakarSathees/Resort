import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { BoatService } from 'src/app/services/boat.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
  boats: any = [];
  addBookingForm: FormGroup;
  errorMessage = '';
  boatId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private boatService: BoatService,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.addBookingForm = this.fb.group({
      boatId: ['', Validators.required],
      address: ['', Validators.required],
      noOfPersons: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      totalPrice: ['', Validators.required],
    });
  }

  ngOnInit() {
      this.getAllBoats();
  }

  getAllBoats() {
    this.boatService.getAllBoats().subscribe((response: any) => {
      console.log(response);
      this.boats = response;
      this.addBookingForm.patchValue({
        boatName: response.boatName,
        boat: response.boatId,
      });
    });
  }

  onSubmit(): void {
    if (this.addBookingForm.valid) {
      const newBoat = this.addBookingForm.value;
      const requestObj: Booking = {
        user: { id: Number(localStorage.getItem('userId')) }, 
        boat: { boatId: Number(newBoat.boatId) }, 
        address: newBoat.address,
        noOfPersons: newBoat.noOfPersons,
        fromDate: newBoat.fromDate,
        toDate: newBoat.toDate,
        totalPrice: newBoat.totalPrice,
        bookingStatus: 'PENDING',
      };
      console.log('requestObj', requestObj);

      this.bookingService.addBooking(requestObj).subscribe(
        (response) => {
          console.log('Booking added successfully', response);
          this.router.navigate(['/customer/dashboard']);
          this.addBookingForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error adding boat', error);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  updatePrice(): void {
    const selectedBoatId = this.addBookingForm.get('boatId').value;
    const selectedBoat = this.boats.find(boat => boat.boatId === Number(selectedBoatId));
    if (selectedBoat) {
      this.addBookingForm.get('totalPrice').setValue(selectedBoat.price);
    }
  }
}
