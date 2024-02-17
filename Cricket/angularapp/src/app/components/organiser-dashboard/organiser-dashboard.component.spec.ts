import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserDashboardComponent } from './organiser-dashboard.component';

describe('OrganiserDashboardComponent', () => {
  let component: OrganiserDashboardComponent;
  let fixture: ComponentFixture<OrganiserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganiserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganiserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
