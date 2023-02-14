import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HereMapComponent } from './here-map/here-map.component';
import { BrowserModule } from '@angular/platform-browser';
import { BookingFormComponent } from './booking-form/booking-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, HereMapComponent, BookingFormComponent],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  exports: [HeaderComponent, HereMapComponent, BookingFormComponent]
})
export class ComponentsModule { }
