import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoatService } from 'src/app/services/boat.service';
import { Boat } from 'src/app/models/boat.model';

@Component({
  selector: 'app-add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: ['./add-boat.component.css']
})
export class AddBoatComponent implements OnInit {

  addBoatForm: FormGroup;
  errorMessage = ''

  constructor(private fb: FormBuilder, private boatService: BoatService, private route: Router) {
    this.addBoatForm = this.fb.group({
      boatName: ['', Validators.required],
      boatImageURL: ['', Validators.required],
      boatAddress: ['', Validators.required],
      boatDescription: ['', Validators.required],
      boatAvailableStatus: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.addBoatForm.valid) {
      const newBoat = this.addBoatForm.value;
      const requestObj: Boat = {
        // userId: localStorage.getItem('userId'),
        boatName: newBoat.boatName,
        boatImageURL: newBoat.boatImageURL,
        boatAddress: newBoat.boatAddress,
        boatDescription: newBoat.boatDescription,
        boatAvailableStatus: newBoat.boatAvailableStatus,
        price: newBoat.price,
        capacity: newBoat.capacity,
      }
      console.log("requestObj",requestObj);
      
      this.boatService.addBoat(requestObj).subscribe(
        (response) => {
          console.log('Boat added successfully', response);
          this.route.navigate(['/admin/dashboard']);
          this.addBoatForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error adding boat', error);
        }
      );
    }else{
      this.errorMessage = "All fields are required"
    }
  }

}
