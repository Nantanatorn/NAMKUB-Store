import { Component, Input, input, OnInit } from '@angular/core';
import { Products } from '../../../model/products';
import { NAMKUBAPIService } from '../../../Service/namkub-api.service'; 
import { Observable } from 'rxjs/internal/Observable';
import {Router} from '@angular/router'
import { CartServiceService } from '../../../Service/cart-service.service';
@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  products: Observable<Products[]> | undefined;

  constructor(private productService: NAMKUBAPIService,
              private router:Router,
              private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.products = this.productService.getActiveProducts();
  }
  
   addToCart(product: any){
    this.cartService.addToCart(product);
   }
}
