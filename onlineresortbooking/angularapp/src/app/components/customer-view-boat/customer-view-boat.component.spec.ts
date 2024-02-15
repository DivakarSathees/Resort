import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewBoatComponent } from './customer-view-boat.component';

describe('CustomerViewBoatComponent', () => {
  let component: CustomerViewBoatComponent;
  let fixture: ComponentFixture<CustomerViewBoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerViewBoatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
