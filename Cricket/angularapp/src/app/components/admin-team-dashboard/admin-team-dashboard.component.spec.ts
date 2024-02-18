import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamDashboardComponent } from './admin-team-dashboard.component';

describe('AdminTeamDashboardComponent', () => {
  let component: AdminTeamDashboardComponent;
  let fixture: ComponentFixture<AdminTeamDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeamDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
