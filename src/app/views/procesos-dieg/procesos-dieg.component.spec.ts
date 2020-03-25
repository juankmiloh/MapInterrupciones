import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosDIEGComponent } from './procesos-dieg.component';

describe('ProcesosDIEGComponent', () => {
  let component: ProcesosDIEGComponent;
  let fixture: ComponentFixture<ProcesosDIEGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesosDIEGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesosDIEGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
