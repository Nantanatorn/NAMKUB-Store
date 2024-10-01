import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cart: any[] =[];

  constructor() {this.loadCartFromLocalStorage(); }
  addToCart(product: any) {
    // ตรวจสอบว่าสินค้ามีอยู่ในรถเข็นแล้ว
    const sameProduct = this.cart.find(p => p.Product_Name === product.Product_Name);
    const sameSize=this.cart.find(p=> p.product_Size===product.product_Size)
    if (sameProduct && sameSize) {
      // ถ้าสินค้ามีอยู่แล้วในรถเข็น ให้เพิ่มจำนวนสินค้า
      sameProduct.quantity += 1;
      Swal.fire({
        title: "เพิ่มจำนวน",
        text: "เพิ่มสินค้าลงรถเข็น",
        icon: "success"
      });
    } else {
      // ถ้าไม่มีสินค้าในรถเข็น ให้เพิ่มสินค้าใหม่พร้อมกำหนดจำนวนเริ่มต้นเป็น 1
      this.cart.push({ ...product, quantity: 1 });
      Swal.fire({
        title: "สำเร็จ",
        text: "เพิ่มสินค้าลงรถเข็น",
        icon: "success"
      });
    }
    this.saveCartToLocalStorage();
  }
  getCart(){
    return this.cart;
  }
  clearCart(){

    this.cart=[];

  }
  public saveCartToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(this.cart));// แปลงjson เก็บใน localStorage
    
  }
  public loadCartFromLocalStorage(){
    const savedCart = localStorage.getItem('cart');
    if (savedCart){
      this.cart =JSON.parse(savedCart);
    }
  }
  
  public removeFromCart(product: any) {
  

    //loop checkout ว่า ตรงไหม
    const index = this.cart.findIndex(p => 
        p.Product_Name === product.Product_Name && p.product_Size === product.product_Size
    );

    console.log('Index found:', index); // ตรวจสอบค่า index

    if (index !== -1) {
      this.cart.splice(index, 1);
      Swal.fire({
        title: "ลบสินค้า",
        text: "ลบสินค้าจากรถเข็นสำเร็จ",
        icon: "success"
      });
      this.saveCartToLocalStorage();
    } else {
      console.log('Product not found in cart');
    }
}

}
