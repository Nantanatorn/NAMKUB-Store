import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter(); // เพิ่ม EventEmitter สำหรับ cart
  
  product = {
    id: 1,
    name: 'น้ำสิงห์',
    description: 'น้ำดื่มคุณภาพ อร่อยมาก',
    price: 300,
    stock: 50,
    image: 'assets/คริสตัล1500.jpg' // อัปเดต path ของรูปให้ถูกต้อง
  };

  constructor() {}

  // ฟังก์ชันสำหรับเพิ่มสินค้าลงในรถเข็น
  onAddToCart(): void {
    console.log(`Adding ${this.product.name} to cart`);
    this.addToCart.emit(this.product); // ส่งข้อมูลสินค้าออกไปเมื่อกดปุ่ม
  }
}