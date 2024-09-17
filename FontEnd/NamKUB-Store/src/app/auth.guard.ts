// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service'; // นำเข้าบริการ AuthService

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   // canActivate(route: any): boolean {
//   //   const userRole = this.authService.getRole();
//   //   if (userRole === 'admin') {
//   //     return true; 
//   //   } else {
//   //     this.router.navigate(['/']); // เปลี่ยนเส้นทางไปยังหน้า Unauthorized ถ้าไม่ใช่ admin
//   //     return false;
//   //   }
//   // }

//   canActivate(route: any): boolean {
//     const requiredRoles: string[] = route.data.roles;
//     if (this.authService.isAuthenticated()) {
//       const userRole = this.authService.getRole();
//       if (requiredRoles.includes(userRole || 'admin')) {
//         return true;
//       } else {
//         this.router.navigate(['/home']); // Redirect to unauthorized page
//         return false;
//       }
//     } else {
//       this.router.navigate(['/register']); // Redirect to login if not authenticated
//       return false;
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบยัง
    if (this.authService.isAuthenticated()) {
      const requiredRoles: string[] = route.data['roles'] || []; // รับ roles ที่จำเป็นจาก route

      // ดึง role ของผู้ใช้จาก AuthService
      const userRole = this.authService.getRole();
      
      // ถ้ามีการกำหนด roles ใน route และ role ของผู้ใช้ตรงกับ roles ที่ต้องการ
      if (requiredRoles.length === 0 || (userRole && requiredRoles.includes(userRole))) {
        return true; // อนุญาตให้เข้าถึงเส้นทางนี้ได้
      } else {
        this.router.navigate(['/register']); // เปลี่ยนเส้นทางไปยังหน้าที่ไม่อนุญาต
        return false; // ไม่อนุญาตให้เข้าถึง
      }
    } else {
      this.router.navigate(['/login']); // เปลี่ยนเส้นทางไปยังหน้า login ถ้าผู้ใช้ไม่ได้เข้าสู่ระบบ
      return false;
    }
  }
}



