import { Component } from '@angular/core';
import { NAMKUBAPIService } from '../../Service/namkub-api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Orders } from '../../model/products';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  order = new BehaviorSubject<Orders[]>([]);

  constructor( private apiservice: NAMKUBAPIService,
    private http : HttpClient
){}

ngOnInit(): void{
this.reloadUsers();
}

reloadUsers(){
this.apiservice.getAllOrders().subscribe((order) =>{
this.order.next(order);
})
}


}
