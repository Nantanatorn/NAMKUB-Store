import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrl: './user-reg.component.css'
})
export class UserRegComponent {

 

constructor (private http: HttpClient){

}


}
