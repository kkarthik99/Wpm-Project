import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { BackgroundService } from '../services/background.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;
  currentBackground: string = '';
  currentQuote: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private backgroundService: BackgroundService
  ) {
    // Subscribe to background changes
    this.backgroundService.currentImage$.subscribe(index => {
      this.currentBackground = this.backgroundService.getCurrentImage();
      this.currentQuote = this.backgroundService.getCurrentQuote();
    });
  }

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/trip-planner']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error?.error || 'Signup failed. Please try again.';
      }
    });
  }
}