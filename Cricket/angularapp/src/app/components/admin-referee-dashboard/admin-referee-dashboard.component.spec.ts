import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRefereeDashboardComponent } from './admin-referee-dashboard.component';

describe('AdminRefereeDashboardComponent', () => {
  let component: AdminRefereeDashboardComponent;
  let fixture: ComponentFixture<AdminRefereeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRefereeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRefereeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
