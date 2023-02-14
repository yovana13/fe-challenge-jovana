import { Component, ViewChild, ElementRef, Renderer2, OnInit} from '@angular/core';
import H from '@here/maps-api-for-javascript';
import { MARKER_ICON, MIN_HOTEL_PRICE, MAX_HOTEL_PRICE } from 'src/app/constants/constats.constats';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
  providers: [ApiService]
})
export class HereMapComponent implements OnInit {
  private map: H.Map;

  hotels: Hotel[] = [];
  selectedHotelIndex: number = 0;
  price: number;

  constructor(private service: ApiService, private renderer: Renderer2, private router: Router) {
    this.price = this.generateRandomPrice();
  }

  @ViewChild('map') mapDiv?: ElementRef; 

  ngOnInit() : void {
    this.getHotels();

    let hotelsCarouselDiv = document.getElementById("hotelsCarousel")
    let topHotelsCarousel =hotelsCarouselDiv?.getBoundingClientRect().top;

    if(hotelsCarouselDiv) {
      hotelsCarouselDiv.addEventListener('touchend', e => {
        setTimeout(() => {
          let selectedCardId = document.elementFromPoint(20, topHotelsCarousel ? topHotelsCarousel : 0)?.id.split("-")[1];
          this.selectedHotelIndex = Number(selectedCardId);
          this.refreshMarkersOnMap();
      }, 500); 
      })
    }
  }


  private getHotels() {
    this.service.getHotels().subscribe((hotels: any) => {
      this.hotels = hotels.items;

      let initialLat = this.hotels && this.hotels.length ? this.hotels[0].position.lat : 0;
      let initialLng = this.hotels && this.hotels.length ? this.hotels[0].position.lng : 0;
      this.selectedHotelIndex = 0;

      this.positionMap(initialLat, initialLng);

      this.hotels.forEach((hotel: any, index: number) => {
        this.addHotelsOnMap(hotel.position.lat, hotel.position.lng, index);
      });
    })
  }

   positionMap(lat: number, lng: number) {
    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: environment.apiKey
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: lat, lng: lng},
          zoom: 15,
        },
      );
      this.map = map;

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      const ui = H.ui.UI.createDefault(this.map, layers);
      window.addEventListener('resize', () => this.map.getViewPort().resize());
    }
  }


  addHotelsOnMap(lat: number, lng: number, index: number) {
    const icon = new H.map.Icon(MARKER_ICON + (index === this.selectedHotelIndex ? '-active' : '') + '.svg');
    const marker = new H.map.Marker({ lat: lat, lng: lng }, {data: index, icon: icon});
    marker.addEventListener('tap', () => {
      this.selectedHotelIndex = marker.getData();
      this.refreshMarkersOnMap();
      this.scrollToCard(index);
    });
    this.map.addObject(marker);
  }

  refreshMarkersOnMap () {
    this.map.getObjects().forEach((object: any)=> {
      const currentMarker = (object as H.map.Marker);
      const icon = new H.map.Icon(MARKER_ICON + (currentMarker.getData() === this.selectedHotelIndex ? '-active' : '') + '.svg');
      currentMarker.setIcon(icon);
      this.map.setCenter({lat: this.hotels[this.selectedHotelIndex].position.lat, lng:this.hotels[this.selectedHotelIndex].position.lng});
    });
  }

  scrollToCard(index: number) {
    document.getElementById('card-'+index)?.scrollIntoView({behavior: 'smooth'});
  }


  generateRandomPrice(): number {
    return Math.floor(Math.random() * MAX_HOTEL_PRICE) + MIN_HOTEL_PRICE;
  }

  openBookingForm(index: number) {
    this.router.navigate(['/book/'+this.hotels[index].title]);
  }

  centerCard(index:number) {
    this.selectedHotelIndex  = index;
    this.scrollToCard(index);
    this.refreshMarkersOnMap();
  }
}
