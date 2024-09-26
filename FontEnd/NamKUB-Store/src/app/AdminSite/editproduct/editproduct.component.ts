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
  UpdateProductform: FormGroup;
  selectedProductId: number | null = null;
  
  
  constructor(private fb: FormBuilder, 
              private http: HttpClient, 
              private router: Router, 
              private productService: NAMKUBAPIService) {

    this.addproductform = this.fb.group({
      Product_Name: ['', Validators.required],
      Product_Picture: [null], 
      Product_Size: [null, [Validators.required, Validators.min(330)]],
      Product_Price: [null, [Validators.required, Validators.min(1)]],
      Sup_ID: [null, Validators.required] 
    });
    this.UpdateProductform = this.fb.group({
      Product_Name: ['', Validators.required],
      Product_Picture: [null], 
      Product_Size: [null, [Validators.required, Validators.min(330)]],
      Product_Price: [null, [Validators.required, Validators.min(1)]],
      Sup_ID: [null, Validators.required] 
    });
  }
  showPopup() {
    Swal.fire({
      title: "Nice!",
      text: "Product Add Successfully!",
      icon: "success"
    });
  }
  showPopup1() {
    Swal.fire({
      title: "Nice!",
      text: "Product Update Successfully!",
      icon: "success"
    });
  }

  closeModal() {
    this.addproductform.reset();
    this.onClose.emit();
    this.isModalOpen = false;
  }
  closeModal1() {
    this.addproductform.reset();
    this.onClose.emit();
    this.isModalOpen1 = false;
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
          this.reloadPage();
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
  @Input() isModalOpen1: boolean = false;
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
  deleteProduct(Product_ID: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/products/${Product_ID}`).subscribe({
          next: () => {
            console.log('Product deleted successfully');
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success"
            });
            
            this.products = this.productService.getAllProduct();
          },
          error: (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error deleting product!",
            });
            console.error('Error deleting product:', error);
          }    });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Product is safe :)",
          icon: "error"
        });
      }
    });

 
  
  }

  editProduct(product: Products) {
    this.isModalOpen1 = true; // เปิด modal สำหรับการแก้ไข

    // เก็บ Product ID ที่เลือกเพื่อใช้ในอนาคต เช่นการอัปเดต
    this.selectedProductId = product.Product_ID; 

    // เติมข้อมูลสินค้าที่เลือกลงในฟอร์ม UpdateProductform
    this.UpdateProductform.patchValue({
      Product_Name: product.Product_Name,
      Product_Picture: product.Product_Picture,
      Product_Size: product.Product_Size,
      Product_Price: product.Product_Price,
      Sup_ID: product.Sup_ID
    });
  }


  onUpdate() {
    if (this.UpdateProductform.valid && this.selectedProductId) {
      const formData = {
        Product_Name: this.UpdateProductform.value.Product_Name,
        Product_Picture: this.UpdateProductform.value.Product_Picture,
        Product_Size: this.UpdateProductform.value.Product_Size,
        Product_Price: this.UpdateProductform.value.Product_Price,
        Sup_ID: this.UpdateProductform.value.Sup_ID
      };

      // ทำการอัปเดตสินค้าผ่าน API โดยใช้ Product_ID ที่เลือกไว้
      this.http.put(`http://localhost:3000/products/${this.selectedProductId}`, formData).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.showPopup1(); 
          this.closeModal1();
          this.reloadPage(); 
          this.selectedProductId = null; // รีเซ็ต Product ID
        
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    }
}

  reloadPage() {
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 1500)
  }
}

  

  
   
  



  
  
  
 
  