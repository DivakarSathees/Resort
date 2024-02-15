import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  public apiUrl =apiUrl;

  constructor(private http: HttpClient) {}

  addBoat(boat: any) {
    return this.http.post(`${this.apiUrl}/api/boat`, boat);
  }

  getAllBoats() {
    return this.http.get(`${this.apiUrl}/api/boat`);
  }

  updateBoat(boatDetails: any) {
    console.log(boatDetails);
    return this.http.put(`${this.apiUrl}/api/boat/${boatDetails.boatId}`, boatDetails);
  }

  deleteBoat(boatId: string) {
    return this.http.delete(`${this.apiUrl}/api/boat/${boatId}`);
  }
}
