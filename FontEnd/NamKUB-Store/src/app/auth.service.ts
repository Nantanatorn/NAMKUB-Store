// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:3000/login'; // ปรับ URL โดยเอา 'login' ออก
//   private usernameSubject = new BehaviorSubject<string | null>(null);
//   public username$ = this.usernameSubject.asObservable();
//   constructor(private router: Router) {}

//   // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token'); // คืนค่า true ถ้ามี token
//   }

 

//  // รับบทบาทของผู้ใช้จาก localStorage
//  getRole(): string | null {
//   const payloadString = localStorage.getItem('payload');
//   if (payloadString) {
//     try {
//       const payload = JSON.parse(payloadString);
//       return payload.user.role; // ดึง role จาก payload
//     } catch {
//       return null;
//     }
//   }
//   return null;
// }

  
//   //แปลง JWT token
//   private parseJwt(token: string): any {
//     try {
//       const base64Url = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
//       return JSON.parse(atob(base64Url));
//     } catch {
//       return null;
//     }
//   }
// }
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Adjust URL if necessary
  private usernameSubject = new BehaviorSubject<string | null>(null);
  public username$ = this.usernameSubject.asObservable();

  constructor(private router: Router) {
    // Initialize the username from payload in localStorage if available
    const payload = localStorage.getItem('payload');
    if (payload) {
      try {
        const parsedPayload = JSON.parse(payload);
        const username = parsedPayload.user?.username || null;
        this.usernameSubject.next(username);
      } catch (error) {
        console.error('Error parsing payload from localStorage:', error);
      }
    }
  }

  // Simulate user login and store token and payload
  login(token: string, payload: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('payload', JSON.stringify(payload));
    const username = payload.user?.username || null;
    this.usernameSubject.next(username);
  }

  // Simulate user logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('payload');
    this.usernameSubject.next(null);
    this.router.navigate(['/']); // Redirect to home or login page
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Return true if there is a token
  }

  // Get the role of the user from the payload in localStorage
  getRole(): string | null {
    const payloadString = localStorage.getItem('payload');
    if (payloadString) {
      try {
        const payload = JSON.parse(payloadString);
        return payload.user.role; // Extract role from payload
      } catch {
        return null;
      }
    }
    return null;
  }

  // Decode JWT token
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64Url));
    } catch {
      return null;
    }
  }
}

