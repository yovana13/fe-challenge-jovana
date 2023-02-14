import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';

import { BookingPageComponent } from './booking-page/booking-page.component';
import { ComponentsModule } from '../components/components.moduel';


@NgModule({
  imports: [ComponentsModule],
  declarations: [HomePageComponent, BookingPageComponent],
  exports: [HomePageComponent, BookingPageComponent]
})
export class PagesModule { }
