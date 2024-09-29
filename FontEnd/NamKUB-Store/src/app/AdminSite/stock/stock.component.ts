import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  Restock, Stock } from '../../model/products';
import { BehaviorSubject, Observable } from 'rxjs';
import { NAMKUBAPIService } from '../../Service/namkub-api.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  stocks = new BehaviorSubject<Stock[]>([]);
  restocks = new BehaviorSubject<Restock[]>([]);
  RestockForm: FormGroup;
  selectedStock: number | null;


  constructor( private apiservice: NAMKUBAPIService,
               private fb : FormBuilder,
               private http : HttpClient
  ){
    this.RestockForm = this.fb.group({
      Restock_Quantity: [null, [Validators.required]],
      Restock_Unitprice: [null, [Validators.required]],
      Stock_ID:[null]
    })
  }

  ngOnInit(): void{
    this.reloadStocks();
    this.reloadRestock();
  }

  @Input() isModalOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>(); 
  @Output() onConfirm = new EventEmitter<any>(); 
  
  reloadStocks(){
    this.apiservice.getAllStockView().subscribe((stocks) =>{
      this.stocks.next(stocks); 
    })
  }
  reloadRestock(){
    this.apiservice.getAllRestock().subscribe((restocks) =>{
      this.restocks.next(restocks);
    })
  }

  RestockModal(stock : Stock){
    this.isModalOpen = true;

    this.selectedStock = stock.Stock_ID;

    this.RestockForm.patchValue({

      Restock_Quantity: stock.Stock_Quantity,
      Restock_Unitprice: stock.Sup_Unitprice,
      Stock_ID: stock.Stock_ID  
    });
    
  }
  closeRestockMoal(){
    this.isModalOpen = false;
  }

  onSubmit(){
    if(this.RestockForm.valid){
      const formData = {
        Restock_Quantity: this.RestockForm.value.Restock_Quantity,
        Restock_Unitprice: this.RestockForm.value.Restock_Unitprice,
        Stock_ID: this.RestockForm.value.Stock_ID
      };
      this.http.post('http://localhost:3000/restock', formData).subscribe({
        next: (response) => {
          console.log('Restock successfully:', response);
          this.showPopup(); 
          this.closeModal();
          this.reloadRestock();
        }
      })
    }
  }
  closeModal() {
    this.RestockForm.reset();
    this.onClose.emit();
    this.isModalOpen = false;
  }
  showPopup() {
    Swal.fire({
      title: "Nice!",
      text: "Restock Successfully!",
      icon: "success"
    });
  }
  reloadPage() {
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 1500)
  }
}
