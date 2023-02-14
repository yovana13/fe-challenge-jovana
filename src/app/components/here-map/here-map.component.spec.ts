import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HereMapComponent } from './here-map.component';

describe('HereMapComponent', () => {
  let component: HereMapComponent;
  let fixture: ComponentFixture<HereMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HereMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HereMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
