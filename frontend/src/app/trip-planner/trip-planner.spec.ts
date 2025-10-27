import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripService, TripResponse } from '../services/trip';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trip-planner.html',
  styleUrl: './trip-planner.css'
})
export class TripPlannerComponent {
  prompt: string = '';
  isLoading: boolean = false;
  travelPlan: string = '';
  error: string = '';
  currentUser: any = null;
  currentBackground: number = 0;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Start background slideshow
    this.startBackgroundSlideshow();
  }

  startBackgroundSlideshow() {
    setInterval(() => {
      this.currentBackground = (this.currentBackground + 1) % 4;
    }, 5000); // Change every 5 seconds
  }

  onSubmit() {
    if (!this.prompt.trim()) {
      this.error = 'Please enter your travel requirements';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.travelPlan = '';

    this.tripService.generateTrip(this.prompt).subscribe({
      next: (response: TripResponse) => {
        this.isLoading = false;
        this.travelPlan = response.travelPlan;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error?.error || 'Failed to generate travel plan. Please try again.';
      }
    });
  }

  clearForm() {
    this.prompt = '';
    this.travelPlan = '';
    this.error = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}