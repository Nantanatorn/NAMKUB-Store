import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  username: string | null = null;
  
  ngOnInit(): void {
    // Retrieve the username 
    // const payload = localStorage.getItem('payload');
    // if(payload){
    //   try{
    //     const jsonPayload =JSON.parse(payload);
    //     this.username = jsonPayload.user.username;
        
    //   }catch(err){
    //     console.error('can not parse payload',err);
    //   }
    // }
    this.username=this.authService.getUsername();
  }
// ล็อกเอาต์ผู้ใช้

constructor(private router: Router ,private authService:AuthService) {}
logout(): void {

  localStorage.removeItem('token');
  this.router.navigate(['/']); // นำทางไปที่หน้า login
}

}
