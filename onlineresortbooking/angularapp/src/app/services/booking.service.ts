import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public apiUrl =apiUrl;

  constructor(private http: HttpClient) {}

  addBooking(booking: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Assuming your token is a bearer token, replace it accordingly
    });
    return this.http.post(`${this.apiUrl}/api/booking`, booking, {headers});
  }

  getBookingsByUserId() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Assuming your token is a bearer token, replace it accordingly
    });
    return this.http.get(`${this.apiUrl}/api/user/${localStorage.getItem('userId')}`, {headers});
  }

  updateBooking(booking: any) {
    const bookingId = booking.bookingId;
    return this.http.put(`${this.apiUrl}/api/booking/${bookingId}`, booking);
  }

  deleteBooking(bookingId: number) {
    return this.http.delete(`${this.apiUrl}/api/booking/${bookingId}`);
  }

  getAllBookings() {
    return this.http.get(`${this.apiUrl}/api/booking`);
  }
}
