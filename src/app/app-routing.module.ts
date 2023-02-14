import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [  
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: `book/:hotelTitle`,
    component: BookingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
