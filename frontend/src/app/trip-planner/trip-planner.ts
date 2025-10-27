import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripService, TripResponse } from '../services/trip';
import { AuthService } from '../services/auth';

interface ParsedTravelPlan {
  destination: string;
  description: string;
  itinerary: { day: string; activities: string }[];
  budget: { category: string; amount: string }[];
  totalBudget: string;
  activities: string[];
  tips: string[];
  rawText: string;
}

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
  parsedPlan: ParsedTravelPlan | null = null;
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
    }, 5000);
  }

  onSubmit() {
    if (!this.prompt.trim()) {
      this.error = 'Please enter your travel requirements';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.travelPlan = '';
    this.parsedPlan = null;

    this.tripService.generateTrip(this.prompt).subscribe({
      next: (response: TripResponse) => {
        this.isLoading = false;
        this.travelPlan = response.travelPlan;
        this.parsedPlan = this.parseTravelPlan(response.travelPlan);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error?.error || 'Failed to generate travel plan. Please try again.';
      }
    });
  }

  parseTravelPlan(travelPlan: string): ParsedTravelPlan {
    const lines = travelPlan.split('\n').filter(line => line.trim());
    
    // Default structure
    const parsed: ParsedTravelPlan = {
      destination: this.extractDestination(lines),
      description: this.extractDescription(lines),
      itinerary: this.extractItinerary(lines),
      budget: this.extractBudget(lines),
      totalBudget: this.extractTotalBudget(lines),
      activities: this.extractActivities(lines),
      tips: this.extractTips(lines),
      rawText: travelPlan
    };

    return parsed;
  }

  private extractDestination(lines: string[]): string {
    // Look for destination in first few lines
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].toLowerCase();
      if (line.includes('destination') || line.includes('goa') || line.includes('kerala') || 
          line.includes('beach') || line.includes('mountain') || line.includes('city')) {
        return lines[i].replace('DESTINATION OVERVIEW', '').replace('DESTINATION', '').trim();
      }
    }
    return 'Your Dream Destination';
  }

  private extractDescription(lines: string[]): string {
    // Find a descriptive line after destination
    for (let i = 1; i < Math.min(10, lines.length); i++) {
      const line = lines[i].trim();
      if (line && !line.includes('ITINERARY') && !line.includes('BUDGET') && 
          !line.includes('ACTIVITIES') && line.length > 20) {
        return line;
      }
    }
    return 'A perfect getaway tailored for your preferences';
  }

  private extractItinerary(lines: string[]): { day: string; activities: string }[] {
    const itinerary: { day: string; activities: string }[] = [];
    let inItinerarySection = false;

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('itinerary') || lowerLine.includes('day')) {
        inItinerarySection = true;
      }
      
      if (inItinerarySection && (lowerLine.includes('day') || lowerLine.includes('day'))) {
        const dayMatch = line.match(/(day\s*\d+|day\s*\d+)/i);
        if (dayMatch) {
          const day = dayMatch[0];
          const activities = line.replace(day, '').replace(':', '').trim();
          if (activities) {
            itinerary.push({ day, activities });
          }
        }
      }
      
      // Stop if we hit another section
      if (inItinerarySection && (lowerLine.includes('budget') || lowerLine.includes('accommodation'))) {
        break;
      }
    }

    // If no specific itinerary found, create default ones
    if (itinerary.length === 0) {
      return [
        { day: 'Day 1', activities: 'Arrival and exploration' },
        { day: 'Day 2', activities: 'Main activities and sightseeing' },
        { day: 'Day 3', activities: 'Cultural experiences and local immersion' }
      ];
    }

    return itinerary.slice(0, 3); // Return first 3 days
  }

  private extractBudget(lines: string[]): { category: string; amount: string }[] {
    const budget: { category: string; amount: string }[] = [];
    let inBudgetSection = false;

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('budget') || lowerLine.includes('accommodation') || lowerLine.includes('food')) {
        inBudgetSection = true;
      }
      
      if (inBudgetSection) {
        // Look for budget items with amounts
        const amountMatch = line.match(/₹?(\d+[,]?\d*)\s*(lakh|lk|k|thousand)?/i);
        if (amountMatch) {
          const amount = `₹${amountMatch[1]}`;
          let category = '';

          if (line.toLowerCase().includes('accommodation') || line.toLowerCase().includes('stay')) {
            category = 'Accommodation';
          } else if (line.toLowerCase().includes('food') || line.toLowerCase().includes('dining')) {
            category = 'Food & Dining';
          } else if (line.toLowerCase().includes('activity') || line.toLowerCase().includes('tour')) {
            category = 'Activities';
          } else if (line.toLowerCase().includes('transport')) {
            category = 'Transportation';
          } else {
            category = line.split(':')[0]?.trim() || 'Other';
          }

          if (category && !budget.find(item => item.category === category)) {
            budget.push({ category, amount });
          }
        }
      }
      
      // Stop if we hit another section
      if (inBudgetSection && (lowerLine.includes('activity') || lowerLine.includes('tip'))) {
        break;
      }
    }

    // Default budget if none found
    if (budget.length === 0) {
      return [
        { category: 'Accommodation', amount: '₹25,000' },
        { category: 'Food & Dining', amount: '₹15,000' },
        { category: 'Activities', amount: '₹7,000' }
      ];
    }

    return budget.slice(0, 4); // Return first 4 budget items
  }

  private extractTotalBudget(lines: string[]): string {
    for (const line of lines) {
      const totalMatch = line.match(/total.*?₹?(\d+[,]?\d*)/i);
      if (totalMatch) {
        return `₹${totalMatch[1]}`;
      }
    }
    return '₹50,000'; // Default
  }

  private extractActivities(lines: string[]): string[] {
    const activities: string[] = [];
    let inActivitySection = false;

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('activity') || lowerLine.includes('experience')) {
        inActivitySection = true;
      }
      
      if (inActivitySection) {
        // Look for bullet points or listed activities
        if (line.includes('•') || line.includes('-') || (line.trim() && !line.includes(':') && line.length < 50)) {
          const activity = line.replace('•', '').replace('-', '').trim();
          if (activity && !activity.toLowerCase().includes('activity') && !activity.toLowerCase().includes('tip')) {
            activities.push(activity);
          }
        }
      }
      
      // Stop if we hit tips section
      if (inActivitySection && lowerLine.includes('tip')) {
        break;
      }
    }

    // Default activities if none found
    if (activities.length === 0) {
      return ['Beach Activities', 'Local Sightseeing', 'Cultural Experiences', 'Adventure Sports'];
    }

    return activities.slice(0, 4); // Return first 4 activities
  }

  private extractTips(lines: string[]): string[] {
    const tips: string[] = [];
    let inTipSection = false;

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('tip') || lowerLine.includes('advice')) {
        inTipSection = true;
      }
      
      if (inTipSection) {
        // Look for bullet points or listed tips
        if (line.includes('•') || line.includes('-') || (line.trim() && line.length < 100)) {
          const tip = line.replace('•', '').replace('-', '').trim();
          if (tip && !tip.toLowerCase().includes('tip') && !tip.toLowerCase().includes('activity')) {
            tips.push(tip);
          }
        }
      }
    }

    // Default tips if none found
    if (tips.length === 0) {
      return [
        'Book accommodations in advance for better rates',
        'Carry local currency for small purchases',
        'Respect local customs and traditions'
      ];
    }

    return tips.slice(0, 3); // Return first 3 tips
  }

  getBudgetPercentage(amount: string): number {
    const numericAmount = parseInt(amount.replace(/[₹,]/g, ''));
    const total = parseInt(this.parsedPlan?.totalBudget?.replace(/[₹,]/g, '') || '50000');
    return (numericAmount / total) * 100;
  }

  clearForm() {
    this.prompt = '';
    this.travelPlan = '';
    this.parsedPlan = null;
    this.error = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}