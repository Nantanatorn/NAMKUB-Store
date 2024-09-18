import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

const api_URL = 'http://localhost:3000'; 

@Injectable({
  providedIn: 'root'
})
export class NAMKUBAPIService {

  constructor(private httpClient: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${api_URL}/products`);
  }
  
}

