import { Component } from '@angular/core';
import { CartServiceService } from '../../Service/cart-service.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: any[] = [];
  totalPrice = 0;
  isSelectAllChecked: boolean = false;

  constructor(private cartService: CartServiceService) {}

  ngOnInit() {
    // Fetch products from the cart service and initialize quantity if not set
    this.cartProducts = this.cartService.getCart();
    this.cartProducts.forEach(product => {
      if (!product.quantity) {
        product.quantity = 1; // Initialize quantity to 1 if not already set
      }
    });
    this.updateTotal();
  }

  increaseQuantity(product: any) {
    product.quantity++;
    this.updateTotal();  // Recalculate the total price
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateTotal();  // Recalculate the total price
    }
  }

  updateTotal() {
    this.totalPrice = this.cartProducts.reduce((acc, product) => {
      return acc + (product.Product_Price * product.quantity);
    }, 0);
  }

  selectAll(event: any) {
    const isChecked = event.target.checked;
    this.cartProducts.forEach(product => product.selected = isChecked);
  }

  checkSelectAllStatus() {
    this.isSelectAllChecked = this.cartProducts.every(product => product.selected);
  }
  isModalOpen:boolean=false;
  openModal(){
    this.isModalOpen=true;
    console.log('dialog box popup')
  }
  closeModal(){
    this.isModalOpen=false;
  }
  getTotalPrice(): number {
    return this.cartProducts.reduce((total, product) => total + (product.Product_Price * product.quantity), 0);
}

}
