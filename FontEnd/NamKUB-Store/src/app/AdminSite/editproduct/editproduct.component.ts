import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../../model/products'; 
import { NAMKUBAPIService } from '../../Service/namkub-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent {
  products: Observable<Products[]> | undefined;
  addproductform: FormGroup;
  selectedProductId: number | null = null;
  
  
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private productService: NAMKUBAPIService) {
    this.addproductform = this.fb.group({
      Product_Name: ['', Validators.required],
      Product_Picture: [null, Validators.required], // ใช้ null เพื่อเก็บไฟล์ภาพ
      Product_Size: [null, [Validators.required, Validators.min(330)]],
      Product_Price: [null, [Validators.required, Validators.min(1)]],
      Sup_ID: [null, Validators.required] // เพิ่มฟิลด์ Sup_ID
    });
  }
showPopup() {
    Swal.fire("Add product success!!!");
  }
  showPopup1() {
    Swal.fire("Deleted product");
  }
  closeModal() {
    this.onClose.emit();
    this.isModalOpen = false;
  }
  onSubmit() {
    
    if (this.addproductform.valid) {
      const formData = {
        Product_Name: this.addproductform.value.Product_Name,
        Product_Picture: this.addproductform.value.Product_Picture,
        Product_Size: this.addproductform.value.Product_Size,
        Product_Price: this.addproductform.value.Product_Price,
        Sup_ID: this.addproductform.value.Sup_ID
      };
    
      

      this.http.post('http://localhost:3000/products', formData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.showPopup(); // เรียกใช้ฟังก์ชันแสดงผลสำเร็จ
          this.closeModal();
        },
        error: (error) => {
          console.error('Error adding product:', error);
          console.log(this.addproductform.errors);
          console.log(this.addproductform.value);
        }
      });
    } else {
      console.log('Form is not valid');
      console.log(this.addproductform.errors);
      console.log(this.addproductform.value);
    }
  }

  

  @Input() isModalOpen: boolean = false;
  @Input() product: { Product_Name?: string; Product_Size?: string; Product_Price?: number; Sup_ID?: number; Product_Picture?: File | null } = {}; 

  @Output() onClose = new EventEmitter<void>(); 
  @Output() onConfirm = new EventEmitter<any>(); 

  ngOnInit(): void {
    this.products = this.productService.getAllProduct();
  }

  openAddProductModal() {
    this.isModalOpen = true;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.addproductform.patchValue({
        Product_Picture: input.files[0].name
      });
    }
  }


  confirm() {
    if (this.product.Product_Name && this.product.Product_Size && this.product.Product_Price && this.product.Sup_ID) {
      this.onConfirm.emit(this.product);
      this.closeModal();
    }
  }

  updateProduct(Product_ID: number) {
    if (this.addproductform.valid) {
      const formData = {
        Product_Name: this.addproductform.value.Product_Name,
        Product_Picture: this.addproductform.value.Product_Picture,
        Product_Size: this.addproductform.value.Product_Size,
        Product_Price: this.addproductform.value.Product_Price,
        Sup_ID: this.addproductform.value.Sup_ID
      };

      this.http.put(`http://localhost:3000/products/${Product_ID}`, formData).subscribe({
        next: () => {
          console.log('Product updated successfully');
          console.log('Product updated successfully');
          this.showPopup;
          
          this.closeModal(); // ปิดโมดอลหลังจากอัปเดตเสร็จ
          this.selectedProductId = null; // รีเซ็ต selectedProductId
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    }
  }
  editProduct(product: Products) {
    this.isModalOpen = true;
    this.selectedProductId = product.Product_ID; // เก็บ ID ของสินค้าที่เลือกแก้ไข
    this.addproductform.patchValue({
      Product_Name: product.Product_Name,
      Product_Picture: product.Product_Picture,
      Product_Size: product.Product_Size,
      Product_Price: product.Product_Price,
      Sup_ID: product.Sup_ID
    });
  }
//--------------ก้อนEdit กับ Update แก้ด้วย

  deleteProduct(Product_ID: any) {


    this.http.delete(`http://localhost:3000/products/${Product_ID}`).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.showPopup1();
        
        this.products = this.productService.getAllProduct();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }    });
  }
  
}



  

  
   
  



  
  
  
 
  