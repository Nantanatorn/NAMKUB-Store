import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  username: string | null = null;
  isProfilePopupVisible = false;

  ngOnInit(): void {
    // Retrieve the username 
    const payload = localStorage.getItem('payload');
    if (payload) {
      try {
        const jsonPayload = JSON.parse(payload);
        this.username = jsonPayload.user.username;
      } catch (err) {
        console.error('Cannot parse payload', err);
      }
    }

    window.onclick = (event: MouseEvent) => {
      const profilePopup = document.getElementById('profilePopup');
      if (profilePopup && !profilePopup.contains(event.target as Node)) {
        this.isProfilePopupVisible = false;
      }
    };
  }

  // Toggle profile popup
  toggleProfilePopup(): void {
    this.isProfilePopupVisible = !this.isProfilePopupVisible;
  }

  // แก้ไขโปรไฟล์
  editProfile(): void {
    this.router.navigate(['/edit-profile']); // นำทางไปที่หน้าแก้ไขโปรไฟล์
  }

  // ล็อกเอาต์ผู้ใช้
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('payload');
    this.router.navigate(['/']); // นำทางไปที่หน้า login
  }
}
