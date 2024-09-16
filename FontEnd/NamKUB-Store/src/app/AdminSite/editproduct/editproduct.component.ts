import { Component } from '@angular/core';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent {
  products = [
    {
      id: '001',
      size: 'Large',
      name: 'Product 1',
      stock: 10,
      price: 100
    },
    {
      id: '002',
      size: 'Medium',
      name: 'Product 2',
      stock: 5,
      price: 200
    }
  ];
}
