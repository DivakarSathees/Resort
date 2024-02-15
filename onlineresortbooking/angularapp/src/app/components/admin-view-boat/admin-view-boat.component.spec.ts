import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBoatComponent } from './admin-view-boat.component';

describe('AdminViewBoatComponent', () => {
  let component: AdminViewBoatComponent;
  let fixture: ComponentFixture<AdminViewBoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewBoatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
