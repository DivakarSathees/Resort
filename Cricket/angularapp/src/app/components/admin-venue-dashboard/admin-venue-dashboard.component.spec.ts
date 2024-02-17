import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVenueDashboardComponent } from './admin-venue-dashboard.component';

describe('AdminVenueDashboardComponent', () => {
  let component: AdminVenueDashboardComponent;
  let fixture: ComponentFixture<AdminVenueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVenueDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVenueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
