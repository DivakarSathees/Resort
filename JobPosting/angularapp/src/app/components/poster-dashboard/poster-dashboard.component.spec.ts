import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterDashboardComponent } from './poster-dashboard.component';

describe('PosterDashboardComponent', () => {
  let component: PosterDashboardComponent;
  let fixture: ComponentFixture<PosterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
