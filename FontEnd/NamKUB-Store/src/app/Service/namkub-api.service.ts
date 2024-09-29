import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products, Restock, Stock, Users } from '../model/products';

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
}


