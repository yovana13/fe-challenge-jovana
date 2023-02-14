import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent {
  bookingForm: FormGroup;
  hotelTitle: string;
  showInfoMessage: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.hotelTitle = this.router.url.split('/')[2];
  }

  private initForm() {
    this.bookingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    })
  }

  onSubmit() {
    if(new Date(this.bookingForm.get('startDate')?.value) < new Date(this.bookingForm.get('endDate')?.value)) {
      this.showInfoMessage = true;

      setTimeout(() => {
        this.showInfoMessage = false;
      }, 5000);
    } else {
      alert("End date cen not be before start date of your stay. Please change the dates.")
    }
  }
}
