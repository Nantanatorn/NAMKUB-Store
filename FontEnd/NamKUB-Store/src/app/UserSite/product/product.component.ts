import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NAMKUBAPIService } from '../../Service/namkub-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
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

  private NAMKUBAPIService = inject(NAMKUBAPIService);

  constructor() {}
  ngOnInit(): void {
    this.NAMKUBAPIService.getAllProduct()
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }

  // ฟังก์ชันสำหรับเพิ่มสินค้าลงในรถเข็น
  onAddToCart(): void {
    console.log(`Adding ${this.product.name} to cart`);
    this.addToCart.emit(this.product); // ส่งข้อมูลสินค้าออกไปเมื่อกดปุ่ม
  }
}