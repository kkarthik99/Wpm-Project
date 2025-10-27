import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TripResponse {
  success: boolean;
  travelPlan: string;
  userPrompt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:5000/api/trip';

  constructor(private http: HttpClient) { }

  generateTrip(prompt: string): Observable<TripResponse> {
    return this.http.post<TripResponse>(`${this.apiUrl}/generate`, { prompt });
  }
}