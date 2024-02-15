import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoatService } from './boat.service';

describe('BoatService', () => {
  let service: BoatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoatService]
    });

    service = TestBed.inject(BoatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  fit('Frontend_should_add_a_boat_when_addBoat_iscalled', () => {
      const boat = { 
        boatName: 'Sailing Paradise', 
        boatImageURL: 'https://example.jpg', 
        boatAddress: 'Sunset Harbor, Slip 18', 
        boatDescription: 'Experience the tranquility of sailing in this cozy paradise boat.', 
        boatAvailableStatus: 'Unavailable', 
        price: '12400', 
        capacity: 140 
      };
      
      const response = { id: '1', ...boat };
    
      (service as any).addBoat(boat).subscribe();
      const req = httpMock.expectOne(`${(service as any).apiUrl}/api/boat`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(boat);
      req.flush(response); 
  });

  fit('Frontend_should_get_all_boats_when_getAllBoats_is_called', () => {
    (service as any).getAllBoats().subscribe((boats) => {
      expect(boats).toBeTruthy();
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/boat`);
    expect(req.request.method).toBe('GET');
  });
});