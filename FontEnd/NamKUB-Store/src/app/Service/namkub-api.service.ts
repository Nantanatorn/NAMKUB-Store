import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alltime, BestSale, Orders, Products, Restock, Stock, Summary, Supplier, Users } from '../model/products';

const api_URL = 'http://localhost:3000'; 

@Injectable({
  providedIn: 'root'
})
export class NAMKUBAPIService {

  constructor(private httpClient: HttpClient) { }

    getAllProduct(): Observable<Products[]> {
      return this.httpClient.get<Products[]>(`${api_URL}/products`);
    }
  
  getAllStockView(): Observable<Stock[]>{
    return this.httpClient.get<Stock[]>(`${api_URL}/stockview`);
  }

  getAllRestock(): Observable<Restock[]>{
    return this.httpClient.get<Restock[]>(`${api_URL}/restockview`);
  }

  getAllUsers(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${api_URL}/user`);
  }
  getAllOrders(): Observable<Orders[]>{
    return this.httpClient.get<Orders[]>(`${api_URL}/getorder`);
  }
  getActiveProducts(): Observable<Products[]>{
    return this.httpClient.get<Products[]>(`${api_URL}/activeproduct`);
  }
  getSummary():Observable<Summary[]>{
    return this.httpClient.get<Summary[]>(`${api_URL}/summary`);
  }
  getAlltime():Observable<Alltime[]>{
    return this.httpClient.get<Alltime[]>(`${api_URL}/AlltimeSUM`);
  }
  getBestSale():Observable<BestSale[]>{
    return this.httpClient.get<BestSale[]>(`${api_URL}/GetBestSale`);
  }
  getSuppliers():Observable<Supplier[]>{
    return this.httpClient.get<Supplier[]>(`${api_URL}/getSupplier`);
  }




}


