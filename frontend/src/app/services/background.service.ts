import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private images = [
    'assets/images/beach11.jpg',
    'assets/images/mountain.jpeg',
    'assets/images/forest.jpeg',
    'assets/images/nightlife.jpeg'
  ];

  private currentImageIndex = new BehaviorSubject<number>(0);
  public currentImage$ = this.currentImageIndex.asObservable();

  // Quotes that match each image
  public quotes = [
    "Where the ocean meets the sky, adventures await",
    "Mountains are calling, and I must go", 
    "In the forest, find peace and new beginnings",
    "City lights, endless nights, memories in the making"
  ];

  constructor() {
    this.preloadImages();
    
    // Start slideshow - changes image every 5 seconds
    interval(5000).subscribe(() => {
      const currentIndex = this.currentImageIndex.value;
      const nextIndex = (currentIndex + 1) % this.images.length;
      this.currentImageIndex.next(nextIndex);
    });
  }

  private preloadImages() {
    this.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  getCurrentImage(): string {
    return this.images[this.currentImageIndex.value];
  }

  getCurrentQuote(): string {
    return this.quotes[this.currentImageIndex.value];
  }
}