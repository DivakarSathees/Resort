import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addPlayer(playerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/player`, playerData);
  }

  getAllPlayers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/player`);
  }

  updatePlayer(playerData: any): Observable<any> {
    const id = playerData.PlayerId;
    return this.http.put(`${this.apiUrl}/api/player/${id}`, playerData);
  }

  deletePlayer(playerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/player/${playerId}`);
  }

  getPlayerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/player/${id}`);
  }
}
