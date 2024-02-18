import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addVenue(venueData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/venue`, venueData);
  }


  getAllVenues(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/venue`);
  }


  // getJobsByUserId(): Observable<any> {
  //   const userId = localStorage.getItem('userId');
  //   return this.http.get<any>(`${this.apiUrl}/api/venue/user/${userId}`);
  // }

  updateVenue(venueData: any): Observable<any> {
    const id = venueData.VenueId;
    return this.http.put(`${this.apiUrl}/api/venue/${id}`, venueData);
  }

  deleteVenue(venueData: any): Observable<any> {
    const id = venueData.VenueId;
    return this.http.delete(`${this.apiUrl}/api/venue/${id}`);
  }


  getVenueById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/venue/${id}`);
  }

  // getAllUsers(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/api/users`);
  // }
}