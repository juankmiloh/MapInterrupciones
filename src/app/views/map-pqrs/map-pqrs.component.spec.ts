import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPQRSComponent } from './map-pqrs.component';

describe('MapPQRSComponent', () => {
  let component: MapPQRSComponent;
  let fixture: ComponentFixture<MapPQRSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPQRSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPQRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
