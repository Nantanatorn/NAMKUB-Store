import { Component, Input, input, OnInit } from '@angular/core';
import { Product } from '../../../model/Product';
import { NAMKUBAPIService } from '../../../Service/namkub-api.service'; 
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  products: Observable<Product[]> | undefined;

  constructor(private productService: NAMKUBAPIService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProduct();
  }
}
