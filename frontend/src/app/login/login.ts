import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { BackgroundService } from '../services/background.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
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
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/trip-planner']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error?.error || 'Login failed. Please try again.';
      }
    });
  }
}