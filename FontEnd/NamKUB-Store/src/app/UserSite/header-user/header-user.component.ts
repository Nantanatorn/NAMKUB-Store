import { Component, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  username: string | null = null;
  isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    if (isPlatformBrowser(this.platformId)) {
      const payload = localStorage.getItem('payload');
      if (payload) {
        try {
          const jsonPayload = JSON.parse(payload);
          this.username = jsonPayload.user.username;
        } catch (err) {
          console.error('Cannot parse payload', err);
        }
      }

      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        this.isDarkMode = true;
        this.renderer.addClass(document.body, 'dark-mode');
      } else {
        this.isDarkMode = false;
        this.renderer.removeClass(document.body, 'dark-mode');
      }

      this.updateNavbarColor();
    }
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        this.renderer.addClass(document.body, 'dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.removeClass(document.body, 'dark-mode');
        localStorage.setItem('theme', 'light');
      }
      this.updateNavbarColor();
    }
  }

  // ปรับสีไล่ระดับสำหรับ navbar
  updateNavbarColor(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (this.isDarkMode) {
      // โทนมืด: น้ำเงิน → ฟ้าเข้ม → ม่วงเข้ม
      navbar.style.background = 'linear-gradient(120deg, #001f3f, #5b2c6f, #000)';
    } else {
      // โทนสว่าง: ฟ้าอ่อน → ฟ้าเข้ม → ม่วง
      navbar.style.background = 'linear-gradient(120deg, #AFD5F0, #0074D9, #6b6bfd)';
    }
  }
  

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }
}
