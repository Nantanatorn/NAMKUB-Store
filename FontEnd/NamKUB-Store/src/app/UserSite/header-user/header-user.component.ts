import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  username: string | null = null;
  ngOnInit(): void {
    // Retrieve the username 
    const payload = localStorage.getItem('payload');
    if(payload){
      try{
        const jsonPayload =JSON.parse(payload);
        this.username = jsonPayload.user.username;
        
        
      }catch(err){
        console.error('can not parse payload',err);
      }
    }
    
  }
// ล็อกเอาต์ผู้ใช้

constructor(private router: Router) {}
logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('payload');
  this.router.navigate(['/']); // นำทางไปที่หน้า login
}

}
