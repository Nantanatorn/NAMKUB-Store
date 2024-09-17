import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/login'; // ปรับ URL โดยเอา 'login' ออก

  constructor(private router: Router) {}

  // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // คืนค่า true ถ้ามี token
  }

  // รับบทบาทของผู้ใช้จาก token
  // getRole(): string | null {
  //   const token = localStorage.getItem('token');
  //   return token ? this.parseJwt(token).role : null; // ดึง role จาก payload
  // }

 // รับบทบาทของผู้ใช้จาก localStorage
 getRole(): string | null {
  const payloadString = localStorage.getItem('payload');
  if (payloadString) {
    try {
      const payload = JSON.parse(payloadString);
      return payload.user.role; // ดึง role จาก payload
    } catch {
      return null;
    }
  }
  return null;
}

  // // ล็อกเอาต์ผู้ใช้
  // logout(): void {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']); // นำทางไปที่หน้า login
  // }

  // แปลง JWT token
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64Url));
    } catch {
      return null;
    }
  }
}

