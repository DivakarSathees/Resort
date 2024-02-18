import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { ResortService } from 'src/app/services/resort.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
  resort: any = [];
  addBookingForm: FormGroup;
  errorMessage = '';
  showSuccessPopup = false;
  confirmPayment = false;
  paymentSuccess = false; // New variable to control the success message display

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private resortService: ResortService,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.addBookingForm = this.fb.group({
      // resortId: [''],
      resortName: [''],
      resortLocation: [''],
      totalPrice: [''],
      capacity: [''],
      address: ['', Validators.required],
      noOfPersons: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit() {
    const resortId = this.route.snapshot.paramMap.get('id');
    this.getResortById(resortId);
  }

  dateRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fromDate = control.get('fromDate')?.value;
    const toDate = control.get('toDate')?.value;

    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      if (fromDateObj > toDateObj) {
        return { 'dateRangeError': true };
      }
    }

    return null;
  }

  getResortById(resortId) {
    this.resortService.getResortById(resortId).subscribe((response: any) => {
      console.log(response);
      this.resort = response;

      // Use patchValue to pre-fill specific form fields
      this.addBookingForm.patchValue({
        resortId: response.resortId,
        resortName: response.resortName,
        resortLocation: response.resortLocation,
        totalPrice: response.price,
        capacity: response.capacity,
      });
      console.log(this.addBookingForm.value)
    });
  }

  onSubmit(): void {
    console.log(this.addBookingForm)
    if (this.addBookingForm.valid) {
      const newBooking = this.addBookingForm.value;
      const requestObj: Booking = {
        userId: Number(localStorage.getItem('userId')),
        resortId: this.resort.resortId,
        resort: {
          resortId:newBooking.resortId,
          resortName: newBooking.resortName,
          resortLocation: newBooking.resortLocation,
          price: newBooking.totalPrice,
          capacity: newBooking.capacity,
          resortImageUrl: '',
          resortAvailableStatus: '',
          description: '',
        },
        address: newBooking.address,
        noOfPersons: newBooking.noOfPersons,
        fromDate: newBooking.fromDate,
        toDate: newBooking.toDate,
        totalPrice: newBooking.totalPrice,
        status: 'PENDING',
      };
      console.log(requestObj)
      this.bookingService.addBooking(requestObj).subscribe(
        (response) => {
          console.log('Booking added successfully', response);
          this.showSuccessPopup = true;
          this.confirmPayment = true;          this.addBookingForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error adding booking', error);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/']);
  }

  makePayment() {
    // Logic to handle payment confirmation
    // For demonstration purposes, setting showSuccessPopup to true
    this.paymentSuccess = true;
    this.confirmPayment = false; // Close the confirmation dialog
  }

  cancelPayment() {
    // Logic to handle cancellation
    this.confirmPayment = false; // Close the confirmation dialog
  }
}
