import { Component, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  bannerImage: string = 'HomePage.webp'; 
  private themeCheckInterval: any; 

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      this.themeCheckInterval = setInterval(() => {
        const storedTheme = localStorage.getItem('theme');
        this.updateBannerImage(storedTheme === 'dark');
      }, 500);

      // ตรวจสอบโหมดที่เก็บไว้ใน localStorage ตอนเริ่มต้น
      const storedTheme = localStorage.getItem('theme');
      this.updateBannerImage(storedTheme === 'dark');
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.themeCheckInterval);
    }
  }

  updateBannerImage(isDarkMode: boolean): void {
    if (isDarkMode) {
      this.bannerImage = 'darkWater.avif'; // รูปสำหรับโทนมืด
      console.log('Dark mode activated. Banner image set to darkWater.avif');
    } else {
      this.bannerImage = 'HomePage.webp'; // รูปสำหรับโทนสว่าง
      console.log('Light mode activated. Banner image set to HomePage.webp');
    }
  }
}
