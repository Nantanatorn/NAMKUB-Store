import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../../model/products';
import { NAMKUBAPIService } from '../../Service/namkub-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrl: './memberlist.component.css'
})
export class MemberlistComponent {
  user = new BehaviorSubject<Users[]>([]);

        constructor( private apiservice: NAMKUBAPIService,
                     private http : HttpClient
        ){}
        
        ngOnInit(): void{
          this.reloadUsers();
        }

        reloadUsers(){
          this.apiservice.getAllUsers().subscribe((user) =>{
            this.user.next(user);
          })
        }
        


}
