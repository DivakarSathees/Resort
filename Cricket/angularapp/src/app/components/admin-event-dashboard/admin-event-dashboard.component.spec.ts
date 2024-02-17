import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventDashboardComponent } from './admin-event-dashboard.component';

describe('AdminEventDashboardComponent', () => {
  let component: AdminEventDashboardComponent;
  let fixture: ComponentFixture<AdminEventDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
